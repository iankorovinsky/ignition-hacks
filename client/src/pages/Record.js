import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { json } from 'react-router-dom';

const Record = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [blobData, setBlobData] = useState();
    const [isRecordingStopped, setIsRecordingStopped] = useState(false);

    const handleConvertToBinary = async () => {
        console.log('starting conversion')
        console.log(recordedChunks)

        if (recordedChunks.length === 0) {
          console.log('recordedChunks 0')
          return;

        }
        
        console.log('recordedChunks over 0')
        setIsRecordingStopped(false); // Reset the flag

        // Concatenate the recorded chunks into a single Blob
        const combinedBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        console.log("combinedBlob: ", combinedBlob)

        try {
          const file = new File([combinedBlob], "temp-audio.webm"); 
          
          console.log("file", file)
    
          const formData = new FormData();
          formData.append("file", file);
        
          const response = fetch("https://api.nftport.xyz/v0/files", {
            method: "POST",
            headers: {
              Authorization: "4eee2cb8-3210-407c-9d3f-fbb8dcf09995"
            },
  
            body: formData
          }).then(res => res.json()).then((data) => {
            fetch('https://ignition-hacks-2023.nn.r.appspot.com/get_analysis ', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                blob: combinedBlob
              })
          })}).then(res => console.log('blob sent!!!'))
        } catch (error) {
          console.log("error", error)
        }
    };
  
    const handleStartRecording = () => {
      console.log('recording started')
      const constraints = { audio: true, video: false };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          const videoStream = webcamRef.current.stream;
          mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              console.log('event data size is over 0')
              console.log('video data', event.data)
              setRecordedChunks((prev) => prev.concat(event.data));
              console.log('setting recorded chunks')
            }
          };

      
          mediaRecorderRef.current.start();
        }).catch((error) => console.log('error', error))
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
      <Webcam audio={true} ref={webcamRef} />
      <button onClick={handleStartRecording}>Start Recording</button>
      <button onClick={handleStopRecording}>Stop Recording</button>
      <h1>asdsad</h1>
    </div>
  )
}

export default Record