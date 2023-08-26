import React from 'react'
import { useState, useEffect, useRef } from 'react'

import Webcam from 'react-webcam';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const About = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [convertedData, setConvertedData] = useState();
    const [isRecordingStopped, setIsRecordingStopped] = useState(false);
    const ffmpeg = new FFmpeg({ log: true });

    const handleConvertToBinary = async () => {
        console.log('starting conversion')
        console.log(recordedChunks)
        if (recordedChunks.length === 0) {
          console.log('recordedChunks 0')
          return;
        }
        
        console.log('recordedChunks over 0')

        // Concatenate the recorded chunks into a single Blob
        const combinedBlob = new Blob(recordedChunks, { type: 'video/x-matroska;codecs=avc1' });

        // Read the Blob contents as binary data
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryData = new Uint8Array(event.target.result);
            console.log('Binary data:', binaryData);
            setConvertedData(binaryData)
            // You can use the binaryData for further processing
        };
        
        reader.readAsArrayBuffer(combinedBlob);
        setIsRecordingStopped(false); // Reset the flag
    };
  
    const handleStartRecording = () => {
      console.log('recording started')

      const stream = webcamRef.current.stream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('event data size is over 0')
          console.log(event.data)
          setRecordedChunks((prev) => prev.concat(event.data));
          console.log('setting recorded chunks')
        }
      };
  
      mediaRecorderRef.current.start();
    };
  
    const handleStopRecording = () => {
      console.log('recording stopped')
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = () => {
            setIsRecordingStopped(true);
        }
      }
    };

    useEffect(() => {
        if (isRecordingStopped) {
          handleConvertToBinary();
        }
      }, [isRecordingStopped]);

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} />
      <button onClick={handleStartRecording}>Start Recording</button>
      <button onClick={handleStopRecording}>Stop Recording</button>
      <h1>asdsad</h1>
      {convertedData && 
        <h1>hi: {convertedData}</h1>
      }
    </div>
  )
}

export default About

const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const form = new FormData();
const fileStream = fs.createReadStream('image.jpg');
form.append('file', fileStream);

const options = {
  method: 'POST',
  body: form,
  headers: {
    "Authorization": "4eee2cb8-3210-407c-9d3f-fbb8dcf09995",
  },
};

fetch("https://api.nftport.xyz/v0/files", options)
  .then(response => {
    return response.json()
  })
  .then(responseJson => {
    // Handle the response
    console.log(responseJson);
  })