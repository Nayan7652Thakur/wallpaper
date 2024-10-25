import React from 'react'

import './App.css'
import Header from './component/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './component/SignUp'
import Home from './component/Home'
import SignIn from './component/SignIn'
import PrivateRoute from './component/PrivateRoute'
import Profile from './component/Profile'
import About from './component/About'

function App() {



  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/about' element={<About />}/>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
