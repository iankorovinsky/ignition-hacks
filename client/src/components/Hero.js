import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

export const Hero = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-center bg-cover text-violet-100">
      <div className="text-center z-10">
        <h2
          className="text-2xl font-bold p-6 bg-clip-text text-transparent bg-gradient-to-t from-violet-500 to-blue-400"
          data-aos="fade-up"
        >
          Announcing Spleef.ai →
        </h2>

        <h1 className="text-8xl font-extrabold" data-aos="fade-up">
          Performance
        </h1>
        <h1
          className="text-8xl font-extrabold p-6 text-violet-500"
          data-aos="fade-up"
        >
          <span className="text-[#d6ebff]-450  bg-violet-500 bg-opacity-30 p-2 inline-block">
            Secure your{" "}
            <Typewriter
              words={["Job.", "Confidence.", "Future."]}
              loop={10}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={80}
              delaySpeed={3000}
            />
          </span>
        </h1>
        <p
          className="text-2xl w-2/3 break-normal mx-auto p-6 text-violet-200"
          data-aos="fade-up"
        >
            Elevate your interview game with smart guidance, expert feedback, and powerful analytics
        </p>
        <Link to="/form">
          <button type='submit' className='text-white px-8 py-5 rounded-xl text-5xl hover:opacity-100 transition ease-in-out duration-100 mt-8 font-bold [background:linear-gradient(90deg,_rgba(109,_149,_237,_0.8),_rgba(231,_123,_240,_0.8))]'>Generate Prompt</button>
        </Link>
      </div>
    </div>
  );
};
