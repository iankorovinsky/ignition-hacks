import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Record from './pages/Record'
import Form from './pages/Form'
import Feedback from './pages/Feedback'

const App = () => {
  return (
    <div className="App [background:linear-gradient(90deg,_rgba(20,_0,_60,_0.9),_rgba(30,_0,_30,_0.9))]">
      <BrowserRouter>
          <Suspense fallback={<div>Page Loading...</div>}>
          <Navbar />
          <AnimatePresence
          mode='wait'>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/record" exact element={<Record />} />
              <Route path="/form" exact element={<Form />} />
              <Route path="/feedback" exact element={<Feedback />} />
            </Routes>
          </AnimatePresence>
          </Suspense>
      </BrowserRouter>
  </div>
  )
}

export default App