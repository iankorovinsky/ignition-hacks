from moviepy.editor import VideoFileClip
import io
import openai
import json
import base64

#OpenAI API Key
openai.api_key = "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" 

def get_text(url):

    video = VideoFileClip("temp.mp4")

    # Extract audio
    audio = video.audio

    # Save audio to a temporary file
    temp_audio_file = "temp_audio.mp3"
    audio.write_audiofile(temp_audio_file)

    # Read the audio file into a bytes-like object
    audio_file= open("temp_audio.mp3", "rb")

    # Transcribe using Whisper ASR API
    response = openai.Audio.translate("whisper-1", audio_file)

    # The transcribed text
    print(response.get("text"))
    return response.get("text")

