import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './page-styles/Feedback.css'

const Feedback = () => {
    const onLinkContainer1Click = useCallback(() => {
      // Please sync "questions" to the project
    }, []);

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
    <div className="relative w-full h-screen overflow-hidden text-left text-[24px] text-dimgray font-inter">
    <div className="absolute top-[calc(50%_-_534px)] left-[calc(50%_-_760px)]  w-[1450px] h-[1046px] overflow-hidden">
      <div className="absolute top-[calc(50%_-_321px)] left-[calc(50%_-_432px)] rounded-3xl bg-gray-100 bg-opacity-5 shadow-[0px_60px_220px_rgba(0,_0,_0,_0.35)] w-[891px] h-[631px]" />
      <div className="absolute top-[calc(50%_-_291px)] left-[calc(50%_-_392px)] rounded-3xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.8),_#fff)] shadow-[0px_1px_4px_rgba(0,_0,_0,_0.05)] w-[830px] h-[582px]">
        <div className="absolute h-[calc(100%_+_79px)] top-[-8.64px] right-[20px] bottom-[-0.36px] w-[177px] overflow-hidden">
        </div>
        <div className="absolute w-[calc(100%_+_44px)] top-[-13px] right-[-21px] left-[-23px] [background:linear-gradient(180deg,_rgba(0,_187,_255,_0.2),_rgba(196,_77,_255,_0.4))] shadow-[0px_20px_40px_rgba(0,_0,_0,_0.15)] h-[614px] rounded-3xl">
          <div className="absolute top-[83px] left-[116px] flex items-center w-[663px] h-[198px]">
            <span className="[line-break:anywhere] w-full">
              <p className="m-0">
                This is the actual feedback. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </span>
          </div>
        </div>
        <div className="absolute h-[calc(100%_-_529px)] top-[479px] bottom-[20px] left-[275px] rounded-3xl [background:linear-gradient(-86.58deg,_#7000ff,_#b134ff)] shadow-[0px_0.7226200103759766px_0.72px_-1.25px_rgba(0,_0,_0,_0.18),_0px_2.7462399005889893px_2.75px_-2.5px_rgba(0,_0,_0,_0.16),_0px_12px_12px_-3.75px_rgba(0,_0,_0,_0.06)] w-[273px] overflow-hidden text-xl text-white">
          <div className="absolute h-[calc(100%_+_404px)] w-full top-[510px] right-[0.3px] bottom-[-914px] left-[-0.3px] rounded-lg [background:linear-gradient(-90deg,_#9966ff,_#00ccff)] [filter:blur(4px)] overflow-hidden opacity-[0.4]" />
          <Link to='/form'>
            <button className="text-white absolute top-[12px] left-[41px] tracking-[-0.1px] leading-[28px] font-semibold">
              Generate New Prompt
            </button>
          </Link>
        </div>
      </div>
     
    </div>
    <div className="absolute top-[103px] left-[calc(50%_-_346px)] w-[665px] h-[100px] text-center text-[90px]">
      <b className="gradient-text">
        Feedback
      </b>
    </div>
  </div>
  )
}

export default Feedback