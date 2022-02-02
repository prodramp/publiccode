from flask import Flask, render_template
from flask_restful import Api, Resource, reqparse
from core.InfoHandler import ApiHandlerFunction


app = Flask(__name__, static_folder='templates/static')
api = Api(app)


class RootApi(Resource):
    '''
    curl -X GET http://localhost:3003/v1/hello --header "Content-Type: application/json"
    curl -X POST http://localhost:3003/v1/hello --header "Content-Type: application/json" --data '{"RequestType":"Hello"}'
    '''
    def get(self):
        return {'resultStatus': 'SUCCESS', 'message': 'Hello from Python Backend '}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('RequestType', type=str)
        args = parser.parse_args()

        message = "RequestType: {}".format(args['RequestType'])
        final_result = {'status': 'SUCCESS', 'message': message}
        return final_result

@app.route('/')
def index_page():
    return render_template('index.html')


api.add_resource(ApiHandlerFunction, '/v1/info')
api.add_resource(RootApi, '/v1/hello')
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8008)

