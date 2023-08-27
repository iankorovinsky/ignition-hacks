import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import './page-styles/Form.css'


const Form = () => {
    const [genre, setGenre] = useState("genre1");
    const [difficulty, setDifficulty] = useState("easy");
    const navigate = useNavigate(); // in case needed to navigate anywhere

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(genre)
        console.log(difficulty)

        const response = await fetch('endpoint-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                genre: genre,
                difficulty: difficulty
            })
        })
        const data = await response.json()
        const interview_question = data['question']

        localStorage.setItem('interview_question', interview_question)

        navigate('/feedback')
        window.location.reload(); 
    }

  return (
    <div className='relative w-full h-[1050px] overflow-hidden text-left text-[24px] text-dimgray font-inter'>
        <div className='p-24 rounded-xl text-white'>
            <h1 className='text-center text-8xl font-bold'>Select Your</h1>
            <h1 className='text-center text-8xl font-bold text-[#B489E1]'>Interview</h1>
            <div className='flex justify-center'>
            <form
                    className="flex flex-col gap-2 mt-2"
                    onSubmit={onSubmit}
                >
                    <label htmlFor='genre' className='text-3xl font-bold text-white mt-10'>Genre</label>
                    <div className="box">
                        <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                            <option value="genre1">Genre1</option>
                            <option value="genre2">Genre2</option>
                            <option value="genre3">Genre3</option>
                        </select>
                    </div>

                    <label htmlFor='difficulty' className='text-3xl font-bold text-white mt-10'>Difficulty</label>
                    <div className='box'>
                        <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button type='submit' className='px-10 py-3 rounded-xl text-2xl hover:opacity-100 transition ease-in-out duration-100 mt-16 font-bold [background:linear-gradient(90deg,_rgba(175,_149,_237,_0.8),_rgba(231,_123,_240,_0.8))]'>Generate Prompt</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Form


