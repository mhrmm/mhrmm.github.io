import math
from flask import Flask, render_template, url_for, request, jsonify
from flask_cors import CORS, cross_origin
from ast_parser import parse

app = Flask(__name__)
CORS(app)


app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/": {"origins": "http://localhost:5173"}})

@app.route('/', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def foo():
    print(request.__dict__)
    return request.json['inputVar']

if __name__ == '__main__':
   app.run()
"""
@app.route('/', methods=['GET', 'POST'])
def index():
    app.logger.debug("hi from the server")
    if request.method == 'POST':
        print(request.__dict__)
        print("form" in request.__dict__)
        form = request.form
        return handle_request(form)
    

def handle_request(form):
    print(form)
    print(request.form)
    result = parse(request.form['hr'])
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
"""

if __name__ == "__main__":
  app.run(debug=True)