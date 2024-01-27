import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home/HomePage';
import NavigationBar from './components/NavBar/NavigationBar';

function App() {
  return (
    <>
      <NavigationBar />
      <HomePage />
    </>
    
  );
}

export default App;
