from flask import Flask, render_template
from flask_restful import Api, Resource

app = Flask(__name__, static_folder='templates/static')
api = Api(app)


@app.route('/')
def index_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8008)

