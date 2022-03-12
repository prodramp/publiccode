#!/usr/bin/env python

"""
Usage:
    predict.py <input-file.csv> <output-file.csv> <deployment_id> [args]

See predict.py -h for more.
We highly recommend that you update SSL certificates with:

    pip install -U urllib3[secure] certifi

Read more at:
    https://app2.datarobot.com/docs/predictions/batch/batch-prediction-api/index.html
"""
import argparse
import contextlib
import json
import logging
import os
import ssl
import sys
import threading
import time

try:
    from urllib2 import urlopen, HTTPError, Request
except ImportError:
    from urllib.request import urlopen, Request
    from urllib.error import HTTPError


BATCH_PREDICTIONS_URL = "{host}/api/v2/batchPredictions/"
POLL_INTERVAL = 15
CHUNK = 64 * 1024


logging.basicConfig(
    level=logging.INFO,
    stream=sys.stdout,
    format="%(asctime)s %(filename)s:%(lineno)d %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)

capath = None
ssl_insecure = False
api_host = None
api_key = None
timeout = None


class DataRobotPredictionError(Exception):
    """Raised if there are issues getting predictions from DataRobot"""


class JobStatus(object):
    INITIALIZING = "INITIALIZING"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    ABORTED = "ABORTED"
    FAILED = "FAILED"

    DOWNLOADABLE = [RUNNING, COMPLETED, ABORTED, FAILED]


def parse_args():
    parser = argparse.ArgumentParser(
        description=__doc__,
        usage="python %(prog)s <input-file.csv> <output-file.csv> <deployment_id>",
    )
    parser.add_argument(
        "input_file", type=argparse.FileType("rb"), help="Input CSV file with data to be scored.",
    )
    parser.add_argument(
        "output_file", type=argparse.FileType("wb"), help="Output CSV file with the scored data.",
    )
    parser.add_argument(
        "deployment_id", type=str, help="Specifies the model deployment identification string.",
    )

    auth_group = parser.add_argument_group("Authentication parameters")
    auth_group.add_argument(
        "--host",
        type=str,
        default="https://app.datarobot.com",
        help="Specifies the protocol (http or https) and "
        "hostname of the public API endpoint. "
        'E.g. "https://your-domain.datarobot.com"',
    )

    auth_group.add_argument(
        "--api_key",
        required=True,
        type=str,
        help="Specifies the api token for the requests.",
    )

    conn_group = parser.add_argument_group("Connection control")
    conn_group.add_argument(
        "--n_concurrent",
        type=int,
        help="Specifies the number of concurrent requests to submit. (default: 4)",
    )
    conn_group.add_argument(
        "--ca_bundle",
        metavar="PATH",
        default=None,
        help="Specifies the path to a CA_BUNDLE file or "
        "directory with certificates of "
        "trusted Certificate Authorities (CAs) "
        "to be used for SSL verification. "
        "By default the system's set of trusted "
        "certificates will be used.",
    )
    conn_group.add_argument(
        "--no_verify_ssl",
        action="store_true",
        default=False,
        dest="ssl_insecure",
        help="Deprecated, use --insecure from now on.",
    )
    conn_group.add_argument(
        "--insecure",
        action="store_true",
        default=False,
        dest="ssl_insecure",
        help="Skip SSL certificates verification for HTTPS "
        "endpoints. Using this flag will cause the "
        "argument for ca_bundle to be ignored.",
    )
    conn_group.add_argument(
        "--timeout",
        type=int,
        default=600,
        dest="timeout",
        help="Set the timeout value in seconds for the up- and download connections "
        "(default: 600 seconds, meaning 10 minutes)",
    )

    csv_group = parser.add_argument_group("CSV parameters")
    csv_group.add_argument(
        "--max_prediction_explanations",
        type=int,
        default=None,
        help="The maximum number of prediction "
        "explanations that will be generate for "
        "each prediction."
        "Not compatible with api version `api/v1`",
    )
    csv_group.add_argument(
        "--keep_cols",
        "--passthrough_columns",
        type=str,
        nargs="?",
        help="Specifies the column names to append to the predictions. "
        "Enter as a comma-separated list.",
    )
    csv_group.add_argument(
        "--passthrough_columns_set",
        action="store_true",
        default=False,
        help="Append all columns to result from scoring dataset.",
    )
    csv_group.add_argument(
        "--exclude_probabilities",
        action="store_true",
        default=False,
        help="Exclude probabilities and threashold for all classes.",
    )
    csv_group.add_argument(
        "--include_probabilities_classes",
        type=str,
        nargs="?",
        default=None,
        help="Include only probabilities for classes listed in the given array.",
    )
    csv_group.add_argument(
        "--include_prediction_status",
        action="store_true",
        default=False,
        help='Include "prediction_status" column in the output.',
    )
    csv_group.add_argument(
        "--column_names_remapping",
        type=str,
        nargs="?",
        default=None,
        help="A mapping of columns to rename from/to. Set a target column "
        "empty to ignore it; Has next format: "
        "columns_1=columns_r_1,columns_2=column_r_2,columns_3=",
    )
    csv_group.add_argument(
        "--encoding",
        type=str,
        default=None,
        help="Declare the dataset encoding. "
        "If an encoding is not provided the batch_scoring "
        'script attempts to detect it. E.g "utf-8", "latin-1" '
        'or "iso2022_jp". See the Python docs for a list of '
        "valid encodings "
        "https://docs.python.org/3/library/codecs.html"
        "#standard-encodings",
    )
    csv_group.add_argument(
        "--delimiter",
        type=str,
        default=None,
        help="The delimiter character to use. Default: , (comma). "
        "To specify TAB as a delimiter, use the string `tab`",
    )
    csv_group.add_argument(
        "--quotechar",
        type=str,
        default=None,
        help="The character to use for quoting fields containing the delimiter. "
        'If not specified, the Batch Predictions API will use `"`',
    )
    csv_group.add_argument(
        "--pred_name",
        type=str,
        nargs="?",
        default=None,
        help="[DEPRECATED] Specifies column name for prediction results, "
        "empty name is used if not specified. For binary "
        "predictions assumes last class in lexical order "
        "as positive",
    )
    csv_group.add_argument(
        "--pred_threshold",
        type=str,
        nargs="?",
        default=None,
        help="[DEPRECATED] Specifies column name for prediction threshold "
        "for binary classification. Column will not be "
        "included if not specified",
    )
    csv_group.add_argument(
        "--pred_decision",
        type=str,
        nargs="?",
        default=None,
        help="[DEPRECATED] Specifies column name for prediction decision, "
        "the value predicted by the model (class label "
        "for classification)",
    )
    timeseries_group = parser.add_argument_group("Time Series parameters")
    timeseries_group.add_argument(
        "--forecast_point",
        type=str,
        nargs="?",
        default=None,
        help='The forecast point, use "infer" to infer from dataset',
    )
    timeseries_group.add_argument(
        "--predictions_start_date",
        type=str,
        nargs="?",
        default=None,
        help="Start date for historical predictions",
    )
    timeseries_group.add_argument(
        "--predictions_end_date",
        type=str,
        nargs="?",
        default=None,
        help="End date for historical predictions",
    )
    return parser.parse_args()


def main():
    args = parse_args()

    input_file = args.input_file
    output_file = args.output_file

    payload = {
        "deploymentId": args.deployment_id,
    }

    if args.keep_cols and args.passthrough_columns_set:
        logger.info(
            "This keep_cols|passthrough_columns and passthrough_columns_set "
            "are mutually excluded. Please use one of them."
        )
        return 1

    if args.pred_name or args.pred_threshold or args.pred_decision:
        logger.warning(
            "pred_name, pred_threshold and pred_decision are deprecated and "
            "will be ignored. They are using only for backward compatibility "
            "in CLI interface."
        )

    # Define host as global
    global api_host
    api_host = args.host

    # Specifies API key
    if args.api_key:
        global api_key
        api_key = args.api_key

    # Specifies path to CA certificates
    if args.ca_bundle:
        global capath
        capath = args.ca_bundle

    if args.ssl_insecure:
        global ssl_insecure
        capath = False
        ssl_insecure = True

    # Specifies default timeout value
    if args.timeout:
        global timeout
        timeout = args.timeout

    # Number of simultaneous requests
    if args.n_concurrent:
        payload["numConcurrent"] = args.n_concurrent

    # Set max prediction explanations
    if args.max_prediction_explanations:
        payload["maxExplanations"] = args.max_prediction_explanations

    # Set passthrough columns
    if args.keep_cols:
        payload["passthroughColumns"] = args.keep_cols.split(",")

    # Include all passthrough columns into result
    if args.passthrough_columns_set:
        payload["passthroughColumnsSet"] = "all"

    # Exclude probabilities
    if args.exclude_probabilities:
        payload["includeProbabilities"] = False

    # Include only specific classes
    if args.include_probabilities_classes:
        payload["includeProbabilities"] = False
        payload["includeProbabilitiesClasses"] = args.include_probabilities_classes.split(",")

    # Include prediction_status column
    if args.include_prediction_status:
        payload["includePredictionStatus"] = True

    # Columns name remapping
    if args.column_names_remapping:
        payload["columnNamesRemapping"] = {
            k: v if v else None
            for k, v in {
                i.split("=")[0]: i.split("=")[1] for i in args.column_names_remapping.split(",")
            }.items()
        }

    # Set csv settings
    csv_settings = {}
    if args.encoding:
        csv_settings["encoding"] = args.encoding
    if args.delimiter:
        csv_settings["delimiter"] = args.delimiter
    if args.quotechar:
        csv_settings["quotechar"] = args.quotechar
    if csv_settings:
        payload["csvSettings"] = csv_settings

    # Set TS settings
    if args.forecast_point:
        payload["timeseriesSettings"] = {"type": "forecast"}
        if args.forecast_point != "infer":
            payload["timeseriesSettings"]["forecastPoint"] = args.forecast_point
    elif args.predictions_start_date and args.predictions_end_date:
        payload["timeseriesSettings"] = {
            "type": "historical",
            "predictionsStartDate": args.predictions_start_date,
            "predictionsEndDate": args.predictions_end_date,
        }
    elif args.predictions_start_date:
        logger.info("Cannot use --predictions_start_date without --predictions_end_date")
        return 1
    elif args.predictions_end_date:
        logger.info("Cannot use --predictions_end_date without --predictions_start_date")
        return 1

    try:
        make_datarobot_batch_predictions(input_file, output_file, payload)
    except DataRobotPredictionError as err:
        logger.exception("Error: {}".format(err))
        return 1

    return 0


def make_datarobot_batch_predictions(input_file, output_file, payload):
    # Create new job for batch predictions
    job = _request("POST", BATCH_PREDICTIONS_URL.format(host=api_host), data=payload)
    links = job["links"]

    logger.info(
        "Created Batch Prediction job ID {job_id} for deployment ID {deployment_id}"
        " ({intake} -> {output}) on {self_link}.".format(
            job_id=job["id"],
            deployment_id=job["jobSpec"]["deploymentId"],
            intake=job["jobSpec"]["intakeSettings"]["type"],
            output=job["jobSpec"]["outputSettings"]["type"],
            self_link=links["self"],
        )
    )

    # Simultaneously upload
    upload_stream = threading.Thread(
        target=upload_datarobot_batch_predictions, args=(job, input_file),
    )
    upload_stream.daemon = True
    upload_stream.start()

    # Simultaneously download
    download_stream = threading.Thread(
        target=download_datarobot_batch_predictions, args=(job, output_file),
    )
    download_stream.daemon = True
    download_stream.start()

    # Wait until job's complete
    job_url = links["self"]
    while True:
        try:
            job = _request("GET", job_url)
            status = job["status"]
            if status == JobStatus.INITIALIZING:
                queue_position = job.get("queuePosition")

                if queue_position is None:
                    logger.info("Waiting for other jobs to complete")
                elif queue_position > 0:
                    logger.info("Waiting for other jobs to complete: {}".format(queue_position))
                else:
                    logger.debug("No queuePosition yet. Waiting for one..")

                time.sleep(POLL_INTERVAL)
                continue

            elif status == JobStatus.RUNNING:
                logger.info(
                    "Waiting for the job to complete: {}%".format(
                        round(float(job["percentageCompleted"]))
                    )
                )

                logger.info("Number of scored rows: {}".format(job["scoredRows"]))
                logger.info("Number of failed rows: {}".format(job["failedRows"]))
                logger.info("Number of skipped rows: {}".format(job["skippedRows"]))

                time.sleep(POLL_INTERVAL)
                continue

            elif status in [JobStatus.COMPLETED, JobStatus.ABORTED, JobStatus.FAILED]:
                upload_stream.join()
                download_stream.join()
                status = _request("GET", job_url)["status"]
                if status in (JobStatus.ABORTED, JobStatus.FAILED):
                    logger.error("The job was ABORTED either by user request or because the job")
                    logger.error("had too many errors. If you ran the job with")
                    logger.error("--include_prediction_status, and any output rows was produced")
                    logger.error("you can check any row-level errors in the downloaded prediction")
                    logger.error("results in the column `prediction_status`")
                    raise DataRobotPredictionError("Job was aborted")
                return

            raise DataRobotPredictionError(job["statusDetails"])

        except KeyboardInterrupt:
            print(
                "KeyboardInterrupt detected, aborting job. "
                "Hang on for a few seconds while we clean up..."
            )
            try:
                _request(
                    "DELETE",
                    BATCH_PREDICTIONS_URL.format(host=api_host) + "{id}/".format(id=job["id"]),
                    to_json=False,
                )
            # It is possible to fail a deletion if the job was COMPLETED before the client
            # registered it. In that case just ignore it.
            except Exception:
                pass
            return

        except Exception as e:
            if "status" in job and not isinstance(e, DataRobotPredictionError):
                logger.exception("Unexpected error occurred")
                raise DataRobotPredictionError(
                    "An unexpected error occurred.\n\n"
                    "{err_type}: {err_msg}\n\n"
                    "Job {job_id} is {job_status}\n"
                    "{job_details}.\nLog: {job_logs}".format(
                        err_type=type(e).__name__,
                        err_msg=e,
                        job_id=job["id"],
                        job_status=job["status"],
                        job_details=job["statusDetails"],
                        job_logs=job["logs"],
                    )
                )

            else:
                raise e


def upload_datarobot_batch_predictions(job_spec, input_file):
    logger.info("Start uploading csv data")

    upload_url = job_spec["links"]["csvUpload"]
    headers = {
        "Content-length": os.path.getsize(input_file.name),
        "Content-type": "text/csv; encoding=utf-8",
    }

    try:
        _request("PUT", upload_url, data=input_file, headers=headers, to_json=False)

    except DataRobotPredictionError as err:
        logger.error('Error, attempting to abort the job and exit: %s', err)
        _request(
            "DELETE",
            BATCH_PREDICTIONS_URL.format(host=api_host) + "{id}/".format(id=job_spec["id"]),
            to_json=False,
        )

    logger.info("Uploading is finished")


def download_datarobot_batch_predictions(job_spec, output_file):
    logger.info("Start downloading csv data")

    job_url = job_spec["links"]["self"]
    job_status = job_spec["status"]

    while job_status not in JobStatus.DOWNLOADABLE:
        job_spec = _request("GET", job_url)
        job_status = job_spec["status"]
        time.sleep(1)

    download_url = job_spec["links"]["download"]
    try:
        with contextlib.closing(_request("GET", download_url, to_json=False)) as response:
            while True:
                chunk = response.read(CHUNK)
                if not chunk:
                    break
                output_file.write(chunk)

    except DataRobotPredictionError as err:
        logger.error('Error, attempting to abort the job and exit: %s', err)
        _request(
            "DELETE",
            BATCH_PREDICTIONS_URL.format(host=api_host) + "{id}/".format(id=job_spec["id"]),
            to_json=False,
        )

    logger.info("Waiting for the job to complete: 100%")
    logger.info("Results downloaded to: {}".format(output_file.name))


def _request(method, url, data=None, headers=None, to_json=True):
    headers = _prepare_headers(headers)

    if isinstance(data, dict):
        data = json.dumps(data).encode("utf-8")  # for python3
        headers.update({"Content-Type": "application/json; encoding=utf-8"})

    request = Request(url, headers=headers, data=data)
    request.get_method = lambda: method

    ctx = ssl.create_default_context(capath=capath)
    if ssl_insecure:
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

    try:
        response = urlopen(request, context=ctx, timeout=timeout)
        if to_json:
            result = response.read()
            response.close()

            # json.loads() in 2.7 and prior to 3.6 needed strings, not bytes:
            # https://docs.python.org/3/whatsnew/3.6.html#json.
            if sys.version_info < (3, 6):
                result = result.decode('utf-8')

            return json.loads(result)

        return response

    except HTTPError as e:
        err_msg = "{code} Error: {msg}".format(code=e.code, msg=e.read())
        raise DataRobotPredictionError(err_msg)

    except Exception as e:
        err_msg = 'Unhandled exception: {e}'.format(e=e)
        raise DataRobotPredictionError(err_msg)


def _prepare_headers(headers=None):
    if not headers:
        headers = {}
    headers.update(
        {
            "Authorization": "Token {}".format(api_key),
            "User-Agent": "IntegrationSnippet-StandAlone-Python",
        }
    )
    return headers


if __name__ == "__main__":
    sys.exit(main())
