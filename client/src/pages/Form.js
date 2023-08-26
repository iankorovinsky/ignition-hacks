import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'


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
    <div className='flex justify-center items-center h-full w-full'>
        <div className='border-white border-solid border-2 p-24 rounded-xl text-black'>
            <h1 className='text-center text-3xl font-semibold'>Set Info</h1>
           <form
                className="flex flex-col gap-2 mt-2"
                onSubmit={onSubmit}
            >
                <label htmlFor='genre' className='text-xl'>Genre</label>
                <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="genre1">Genre1</option>
                    <option value="genre2">Genre2</option>
                    <option value="genre3">Genre3</option>
                </select>

                <label htmlFor='difficulty' className='text-xl'>Difficulty</label>
                <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Form