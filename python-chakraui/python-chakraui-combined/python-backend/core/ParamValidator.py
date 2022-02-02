

def ValidateParameters(request_type, request_json):
    result_status = False
    result_message = []

    if request_json:
        result_message = {'JsonReceived': request_json}
        result_status = True

    return result_status, result_message
