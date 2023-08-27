import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { json } from 'react-router-dom';

const Record = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
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

          const formData2 = new FormData();
          formData.append("audio", combinedBlob)

          const response = fetch("https://api.nftport.xyz/v0/files", {
            method: "POST",
            headers: {
              Authorization: "4eee2cb8-3210-407c-9d3f-fbb8dcf09995"
            },
  
            body: formData
          }).then(res => res.json()).then((data) => {
            const bucketName = 'ignition-hacks-2023.appspot.com';
            const fileName = 'audio.webm';
            const accessToken = "ya29.a0AfB_byDrEdLc6pCfruAa-RYhmyIWbvi4E_fHDm5pWwiaNDv_DWAu9PzWIE8mkvWUkrw6wMa-C8kxqoW0w-3DJYyWbhyUwsfwIphVa0FiKjitSBeH0PUUw-w_ulYbzIQHp2TKH0Jn0xe6nGVn_XLgQOJDD4uUG81VVIS-LwaCgYKAXESARASFQHsvYlsgJxCGOqy3sHf_J2dhEg2pw0173"; // Obtain this token securely
            const apiUrl = `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${fileName}`;
            fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'audio/webm',
              },
              body: combinedBlob
              //blob: combinedBlob
                            
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