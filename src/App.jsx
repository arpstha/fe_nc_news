import { useState } from 'react'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
//import UserContext from '../contexts/User'
import Nav from './components/Nav'
import Homepage from './components/Homepage'



function App() {

  const [loggedInUser, setLoggedInUser] = useState('grumpy19') // hardcoded default user

  return (
    <div>
    <Nav />
    {/* <UserContext.Provider value={{loggedInUser: loggedInUser }}> */}
    <Header />
    <Homepage />

    {/* //</UserContext.Provider> */}
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/topic' element={<Nav />}/>
    </Routes>
    </div>
  )
}

export default App;
