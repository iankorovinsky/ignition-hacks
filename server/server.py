from flask import Flask
import vta 
import questions
import requests
from flask import Flask, request


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def welcome():
    return "Hello Humi!"

@app.route('/get_question', methods=['POST'])
def get_question():
    question = questions.get_question(request.args["type"], request.args["difficulty"])
    return {
        "question": question
    }

@app.route('/get_analysis', methods=['POST'])
def get_analysis():
    text = vta.get_text(request.args["url"])
    return text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)