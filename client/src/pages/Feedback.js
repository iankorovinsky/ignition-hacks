import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Feedback = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        fetch(`endpoint-url`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }    
        }).then(response => response.json())
        .then(data => {
          console.log(data)
          setData(data)}
        )
        
      }, [])

  return (
    <div>
        Feedback
    </div>
  )
}

export default Feedback