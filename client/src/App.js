import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Form from './pages/Form'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Suspense fallback={<div>Page Loading...</div>}>
          <Navbar />
          <AnimatePresence
          mode='wait'>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/form" exact element={<Form />} />
            </Routes>
          </AnimatePresence>
          </Suspense>
      </BrowserRouter>
  </div>
  )
}

export default App