import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import ArticleCard from './components/ArticleCard';
import { UserProvider } from './contexts/User';

function App() {
    return (
      <div className='App'>
        <Nav />
        <Header />
        <UserProvider>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/topic' element={<Nav />} />
            <Route path='/article/:article_id' element={<ArticleCard />} />
          </Routes>
        </UserProvider>
      </div>
    );
}

export default App;