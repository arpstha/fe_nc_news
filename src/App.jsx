import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Nav from './components/Nav'
import Homepage from './components/Homepage'



function App() {

  return (
    <div className='App'>
    <Nav />
  
    <Header />
    <Homepage />
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/topic' element={<Nav />}/>
    </Routes>
    </div>
  )
}

export default App;
