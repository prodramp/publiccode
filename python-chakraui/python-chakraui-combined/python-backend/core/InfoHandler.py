from flask_restful import Api, Resource, reqparse
from core.ParamValidator import ValidateParameters


class ApiHandlerFunction(Resource):
    '''
    curl -X GET http://localhost:8008/v1/info --header "Content-Type: application/json"
    curl -X POST http://localhost:8008/v1/info --header "Content-Type: application/json" --data '{"RequestType":"Bye", "RequestJson": {}}'
    curl -X POST http://localhost:8008/v1/info --header "Content-Type: application/json" --data '{"RequestType":"Bye", "RequestJson": "{'a': '11'}"}'
    '''
    def get(self):
        return {'resultStatus': 'SUCCESS', 'message': 'Hello from ApiHandlerFunction'}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('RequestType', type=str)
        parser.add_argument('RequestJson', type=str)

        args = parser.parse_args()

        request_type = args['RequestType']
        request_json = args['RequestJson']
        result_status, result_message = ValidateParameters(request_type, request_json)

        message = "RequestStatus: {}, ResultMessage: {}".format(result_status, result_message)
        final_result = {'status': 'SUCCESS', 'message': message}
        return final_result
