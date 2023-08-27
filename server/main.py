from flask import Flask
import vta 
import questions
import requests
import analyze_text
from flask import Flask, request
from flask_cors import CORS

#API

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

question_spawned = ""

@app.route('/', methods=['GET', 'POST'])
def welcome():
    return "Hello Humi!"

@app.route('/get_question', methods=['POST'])
def get_question():
    question = questions.get_question(request.args["type"], request.args["difficulty"])
    question_spawned = question
    return question

@app.route('/get_analysis', methods=['POST'])
def get_analysis():
    text = vta.get_text(request.args["blob"])
    feedback = analyze_text.generate_text(question_spawned, text)
    return feedback

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=105)