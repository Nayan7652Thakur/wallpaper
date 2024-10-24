import React from 'react'

import './App.css'
import Header from './component/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './component/SignUp'
import Home from './component/Home'
import SignIn from './component/SignIn'

function App() {



  return (
    <>
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/sign-in' element={<SignIn />}/>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
