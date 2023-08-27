import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import SpleefAI from '../pictures/spleefai.png'

import './component-styles/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()

  const firebaseConfig = {
    apiKey: "AIzaSyALlVGx3v1ixm29J62jxOA88UUM7P1FaYQ",
    authDomain: "ignitionhacks-36c06.firebaseapp.com",
    projectId: "ignitionhacks-36c06",
    storageBucket: "ignitionhacks-36c06.appspot.com",
    messagingSenderId: "772707906644",
    appId: "1:772707906644:web:f17bfc8f3ebf5bbf2de9c1",
    measurementId: "G-B3F3NZV6KD"
  };

  firebase.initializeApp(firebaseConfig);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in successfully
        const user = result.user;
        console.log('Signed in successfully:', user);
        console.log('Firebase User ID:', user.uid);
        console.log('Firebase Display Name: ', user.displayName)
        localStorage.setItem('uid', JSON.stringify(user.uid));
        localStorage.setItem('name', JSON.stringify(user.displayName));
        setLoggedIn(!loggedIn)
      })
      .catch((error) => {
        // Sign in failed
        console.error('Sign in with Google failed:', error);
      });
    };
    
  const signOut = () => {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem('name', null)
        console.log('Signed out successfully');
        setLoggedIn(!loggedIn)
    })
        .catch((error) => {
        console.error('Sign out failed:', error);
    });
  };

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

  const [loggedIn, setLoggedIn] = useState(false)

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

useEffect(() => {
    if (localStorage.getItem('name') == 'null') {
      navigate('/') 
    } else {
        setLoggedIn(true)
    }
  }, [])

    return (
      <div className='flex justify-center mb-40'>
        <motion.header
          variants={dropIn}
          initial='hidden'
          animate='visible'
          exit='exit'
          className={`navbar z-[99999999] py-2 lg:py-1 fixed w-full top-0 ${fillNavbar ? 'fill' : ''}`}
        >
          <div className="px-4 mx-auto flex flex-col lg:flex-row lg:items-center justify-center h-full">
            <div className="flex justify-between items-center">   
              <button
                className="border-none px-3 py-1 rounded text-gray-200 bg-violet-200 hover:opacity-100 lg:hidden cursor-pointer"
                aria-label="Menu"
                data-test-id="navbar-menu"
                onClick={
                  () => {
                      setShowDropdown(!showDropdown);
                  }}
              >
                <FaBars size={20} color="#D4BCF5"/>
              </button>
            </div>

            {loggedIn === true ? (
                <div className={`${showDropdown ? "flex" : "hidden"} flex-col lg:flex lg:flex-row lg:ml-auto mt-3 lg:mt-0 w-full`} data-test-id="navbar">
                    <div className='flex items-center justify-between w-full'>
                        <Link to='/'>
                            <img src={SpleefAI} className='h-16 object-cover'/>
                        </Link>
                        <div className='flex items-center'>
                            {links.map(({ name, link, priority, id }) => 
                                <Link key={name}  to={link} className='md:text-2xl text-lg lg:mx-2 mx-0 hover:bg-gray-200/25 hover:bg-opacity-10 hover:bg-black p-2 lg:px-4 rounded duration-300 transition-colors'>
                                    {name}
                                </Link>
                            )}
                            <Link to='/'>
                            <button
                                className="text-violet-900 hover:bg-violet-400 hover:text-violet-900 text-center border border-solid border-violet-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                                data-test-id={`navbar-logout`}
                                onClick={() => signOut()}
                            >
                                Log out
                            </button>
                        </Link>
                        </div>
                        
                    </div>
                </div>
            ) : (
                <div className={`${showDropdown ? "flex" : "hidden"} md:flex justify-between w-full items-center`}>
                    <Link to='/'>
                        <img src={SpleefAI} className='h-16 object-cover'/>
                    </Link>
                    <Link to='/'>
                        <button
                            className="text-violet-900 hover:bg-violet-400 hover:text-violet-900 text-center border border-solid border-violet-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                            data-test-id={`navbar-login`}
                            onClick={(e) => signInWithGoogle()}
                        >
                            Log in
                        </button>
                    </Link>
                </div>
            )}
          </div>
        </motion.header>
      </div>
    );
  }

  export default Navbar