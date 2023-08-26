from flask import Flask
import vta 
import questions
import requests
from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def welcome():
    text = vta.get_text()
    return text

@app.route('/get_question', methods=['POST'])
def get_question():
    question = get_question(request.args["type"], request.args["difficulty"])
    return {
        "question": question
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)