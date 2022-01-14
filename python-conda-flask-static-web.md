## For YouTube content ##

### YouTube content url: ###
- https://www.youtube.com/watch?v=dGdLsXePEqA

### Python Package Installation: ###
$ pip install Flask, Flask-restful, Flask-compress
$ pip install python-dotenv


### File app.py ###
```
from flask import Flask, render_template
from flask_compress import Compress
from flask_restful import Api

app = Flask(__name__, static_folder='templates/static')
Compress(app)
api = Api(app)
app.secret_key = 'secret_key'

@app.route('/')
def index_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
```

### File index.html ###

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>
        Demo Project
    </title>
</head>
<body>
        <h1>Welcome Everyone</h1>
</body>
</html>
```

### File .env ###
```
PORT_NUMBER=8005
```

### File app.py ###

```
from flask import Flask, render_template
from flask_compress import Compress
from flask_restful import Api, Resource, reqparse
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__, static_folder='templates/static')
Compress(app)
api = Api(app)
app.secret_key = 'secret_key'

@app.route('/')
def index_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.getenv('PORT_NUMBER', debug=True)
```
