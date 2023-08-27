from flask import Flask
import vta 
import questions
import requests
import analyze_text
from flask import Flask, request
from flask_cors import CORS
import logging
import os

#API

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

question_spawned = ""

@app.route('/', methods=['GET', 'POST'])
def welcome():
    print("Hello Humi!")
    return "Hello Humi!"

@app.route('/get_question', methods=['POST'])
def get_question():
    question = questions.get_question(request.args["type"], request.args["difficulty"])
    question_spawned = question
    return question

@app.route('/get_analysis', methods=['POST'])
def get_analysis():
    print("Entering get text method")
    try:
        text = vta.get_text(request.args["blob"])
    except Exception as error:
        # handle the exception
        print("An exception occurred:", error)
    print("received text to speech in main")
    feedback = analyze_text.generate_text(question_spawned, text)
    print("received feedback, returning:")
    print(feedback)
    return feedback

@app.route("/upload", methods=["POST"])
def upload():
    audio_file = request.files.get("audio")
    if audio_file:
        filename = os.path.join("uploads", "audio.webm")
        audio_file.save(filename)
        print("success")
        return "File uploaded successfully", 200
    else:
        print("failed")
        return "No file uploaded", 400

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=105)