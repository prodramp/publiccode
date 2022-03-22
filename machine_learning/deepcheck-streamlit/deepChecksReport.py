import json
import io
from deepchecks.suites import full_suite


def generate_dc_report(df):
    suite = full_suite()
    dc_report = suite.run(df)
    return dc_report


def get_all_keys(results):
    all_key = []
    for item in results:
        item_json = json.loads(item)
        if 'name' in item_json:
            all_key.append(item_json['name'])
    return all_key


def render_dc_report(df):
    dc_report = generate_dc_report(df)
    json_result = json.loads(dc_report.to_json())
    results = None
    name = None
    if 'name' in json_result:
        name = json_result['name']
    if 'results' in json_result:
        results = json_result['results']
    result_keys = []
    if results is not None and len(results) > 0:
        result_keys = get_all_keys(results)

    return name, results, result_keys
