import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'

import './component-styles/Navbar.css'

function Navbar() {
  const dropIn ={
    hidden: {
        y: '-10vh',
        opacity: 0,
    },
    visible: { 
        y:'0',
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 8,
            stiffness: 30,
        }
    },
    exit: {
        y: '10vh',
        opacity: 0,
    },
  };

  const [fillNavbar, setFillNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      if (window.scrollY > threshold) {
        setFillNavbar(true)
      }
      else {
        setFillNavbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll);
  
  }, [fillNavbar])

  const links = [
    {
        name: "Home",
        link: "/",
        id: "home",
        priority: false
    },
    {
        name: "Record",
        link: "/record",
        id: "record",
        priority: false
    },
    {
        name: "Form",
        link: "/form",
        id: "form",
        priority: false
    },
    {
      name: "Feedback",
      link: "/feedback",
      id: "feedback",
      priority: false
  }
]

    return (
      <div className='flex justify-center mb-40'>
        <motion.header
          variants={dropIn}
          initial='hidden'
          animate='visible'
          exit='exit'
          className={`navbar z-[99999999] py-2 lg:py-4 fixed w-full top-0 ${fillNavbar ? 'fill' : ''}`}
        >
          <div className="px-4 mx-auto flex flex-col lg:flex-row lg:items-center justify-center h-full">
            <div className="flex justify-between items-center">
              <Link to='/'>
                <h1>Will replace with Logo</h1>
              </Link>
    
              <button
                className="border-none px-3 py-1 rounded text-gray-200 bg-green-200 opacity-75 hover:opacity-100 lg:hidden cursor-pointer"
                aria-label="Menu"
                data-test-id="navbar-menu"
                onClick={
                  () => {
                      setShowDropdown(!showDropdown);
                  }}
              >
                <FaBars size={20} color="#8bcc9a"/>
              </button>
            </div>
         
            <div className={`${showDropdown ? "flex" : "hidden"} flex-col lg:flex  lg:flex-row lg:ml-auto mt-3 lg:mt-0`} data-test-id="navbar">
              <div>
                {links.map(({ name, link, priority, id }) => 
                  <Link key={name}  to={link} className='md:text-xl text-lg lg:mx-2 mx-0 hover:bg-gray-200/25 hover:bg-opacity-10 hover:bg-black p-2 lg:px-4 rounded duration-300 transition-colors'>
                      {name}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.header>
      </div>
    );
  }

  export default Navbar