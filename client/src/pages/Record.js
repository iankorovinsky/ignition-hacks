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

    const uploadToIPFS = async () => {
      if (blobData == undefined) {
        setTimeout(() => {
          console.log("Delayed output");
        }, 2000);
      }

      console.log("blobData", blobData)
      const file = new File([blobData], "temp-video.mp4"); // Replace "your_file_content" with the actual file content
    
      const formData = new FormData();
      formData.append("file", file);
    
      const response = await fetch("https://api.nftport.xyz/v0/files", {
        method: "POST",
        headers: {
          Authorization: "4eee2cb8-3210-407c-9d3f-fbb8dcf09995"
        },
        body: formData
      });
    
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse)
        return jsonResponse;
      } else {
        throw new Error("File upload failed");
      }
    };

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
        const combinedBlob = new Blob(recordedChunks, { type: 'video/mp4' });
        console.log("combinedBlob: ", combinedBlob)

        try {
          const file = new File([combinedBlob], "temp-video.mp4"); // Replace "your_file_content" with the actual file content
          
          console.log("file", file)
    
          const formData = new FormData();
          formData.append("file", file);
        
          const response = fetch("https://api.nftport.xyz/v0/files", {
            method: "POST",
            headers: {
              Authorization: "4eee2cb8-3210-407c-9d3f-fbb8dcf09995"
            },
  
            body: formData
          }).then(res => res.json()).then(data => console.log(data));
      
        
        } catch (error) {
          console.log("error", error)
        }
    };
  
    const handleStartRecording = () => {
      console.log('recording started')
      const constraints = { audio: true, video: true };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          const videoStream = webcamRef.current.stream;
          mediaRecorderRef.current = new MediaRecorder(videoStream, { mimeType: 'video/webm' });

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