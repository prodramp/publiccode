# Sample Python 3.9 application with flask #

1. Install all flask specific dependency
```
 $ pip install flask flask-compress flask-restful
```

2. Create a file call app.py and add the following code: 

```
from flask import Flask, render_template
from flask_restful import Api, Resource

app = Flask(__name__, static_folder='templates/static')
api = Api(app)


@app.route('/')
def index_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8008)
```

3. Create as folder name "templates" in the same folder where app.py exists and then inside templates folder create "index.html" and add some test code in the index.html as below:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>
        Demo Python Backend Project
    </title>
</head>
<body>
        <h1>Welcome Everyone from backend</h1>
</body>
</html>
```

3. Running python app as below:

```
$ python app.py
```

4. Please visit the URL below for the full details.
- https://github.com/prodramp/publiccode/tree/master/python-chakraui/python-backend
