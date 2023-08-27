from flask import Flask
import vta 
import questions
import requests
import analyze_text
from flask import Flask, request
from flask_cors import CORS
from google.cloud import storage
import openai
import assemblyai as aai
#API

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

question_spawned = ""

# Initialize the Google Cloud Storage client
storage_client = storage.Client()

aai.settings.api_key = "API-KEY"

# Create a transcriber object.
transcriber = aai.Transcriber()

@app.route('/', methods=['GET', 'POST'])
def welcome():
    print("Hello Humi!")
    return "Hello Humi!"

@app.route('/get_question', methods=['POST'])
def get_question():
    question = questions.get_question(request.args["type"], request.args["difficulty"])
    question_spawned = question
    return {
        "text": question
    }

@app.route('/download_mp3', methods=['POST'])
def download_mp3():
    """
    # Define your bucket and blob name
    bucket_name = "ignition-hacks-2023.appspot.com"
    blob_name = "audio.webm"
    # Get the bucket and blob
    print("getting bucket")
    bucket = storage_client.get_bucket(bucket_name)
    print(f"got bucket: {bucket}, getting blob")
    blob = bucket.blob(blob_name)
    print(f"got blob: {blob}, getting webm")
    # Download the blob's content into a bytes variable
    webm_content = blob.download_as_bytes()
    print("got webm, getting whisper")
    """
    print("getting aai")
    transcript = transcriber.transcribe("https://storage.cloud.google.com/ignition-hacks-2023.appspot.com/audio.webm")
    print("got response, getting text")
    text = transcript.text
    print(f"text: {text}")
    feedback = analyze_text.generate_text(question_spawned, text)
    print(f"feedback: {feedback}")
    return {
        "text": feedback
    }



if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=105)