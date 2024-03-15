import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Homepage from './components/Homepage';
import ArticleCard from './components/ArticleCard';
import Topics from './components/Topics';
import { UserProvider } from './contexts/User';
import TopicCard from './components/TopicCard';
import ErrorPage from './components/ErrorPage';


function App() {
    return (
      <div className='App'>
        <Nav />
        <Header />
        <UserProvider>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/topics' element={<Topics />} />
            <Route path='/articles' element={<TopicCard />} />
            <Route path='/article/:article_id' element={<ArticleCard />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </UserProvider>
      </div>
    );
}

export default App;