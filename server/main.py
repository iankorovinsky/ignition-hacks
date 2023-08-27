from flask import Flask, jsonify
import vta 
import questions
import requests
import analyze_text
from flask import Flask, request
from flask_cors import CORS
from google.cloud import storage
import openai
import assemblyai as aai
import time
#API

app = Flask(__name__)
CORS(app, resources={r"/download_mp3": {"origins": "*"}, r"/get_question": {"origins": "*"}, r"/feedback": {"origins": "*"}})

question_spawned = ""
feedback_master=""

# Initialize the Google Cloud Storage client
storage_client = storage.Client()

aai.settings.api_key = "API_KEY"

# Create a transcriber object.
transcriber = aai.Transcriber()

@app.route('/', methods=['GET', 'POST'])
def welcome():
    print("Hello Humi!")
    global feedback_master
    feedback_master="initialized"
    print(f"feedback_master: {feedback_master}")
    return "Hello Humi!"

@app.route('/get_question', methods=['POST'])
def get_question():
    question = questions.get_question(request.args["type"], request.args["difficulty"])
    global question_spawned
    question_spawned = question
    return {
        "text": question
    }

@app.route('/download_mp3', methods=['POST'])
def download_mp3():
    bucket_name = "ignition-hacks-2023.appspot.com"
    blob_name = "audio.webm"
    # Get the bucket and blob
    print("getting bucket")
    bucket = storage_client.get_bucket(bucket_name)
    print(f"got bucket: {bucket}, getting blob")
    blob = bucket.blob(blob_name)
    print(f"got blob: {blob}, getting webm")
    print("getting aai")
    transcript = transcriber.transcribe("https://storage.googleapis.com/ignition-hacks-2023.appspot.com/audio.webm")
    print("got response, getting text")
    text = transcript.text
    print(f"text: {text}")
    feedback = analyze_text.generate_text(question_spawned, text)
    print(f"feedback: {feedback}")
    epoch_time = str(int(time.time()))
    new_blob_name = f'audio_{epoch_time}.webm'
    print(f"renaming file to {new_blob_name}")
    bucket.rename_blob(blob, new_blob_name)
    global feedback_master
    feedback_master = feedback
    print(f"feedback_master has been set to: {feedback_master}")
    return jsonify({'feedback': feedback})

@app.route('/feedback', methods=['GET'])
def feedback():
    global feedback_master
    print(f"feedback master (upon submit) {feedback_master}")
    return jsonify({'feedback': feedback_master})


if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=105)