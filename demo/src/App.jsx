import React from 'react';
import './App.css';
import Header from './component/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './component/SignUp';
import Home from './component/Home';
import SignIn from './component/SignIn';
import PrivateRoute from './component/PrivateRoute';
import Profile from './component/Profile';
import About from './component/About';
import { useSelector } from 'react-redux'; // Assuming you are using Redux for state management

function App() {
  // Use Redux or Context to check if the user is authenticated
  const {currentUser} = useSelector((state) => state.user);
console.log(currentUser);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Redirect to home if user is authenticated */}
        <Route 
          path='/sign-up' 
          element={currentUser ? <Navigate to="/" /> : <SignUp />} 
        />
        <Route 
          path='/sign-in' 
          element={currentUser ? <Navigate to="/" /> : <SignIn />} 
        />
        <Route path='/about' element={<About />} />
        
        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
