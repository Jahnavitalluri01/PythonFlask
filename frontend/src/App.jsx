import { useState } from 'react'
import './App.css'
import Dashboard from './Components/Dashboard'

import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/add" element={<Addfriend /> } /> */}
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
