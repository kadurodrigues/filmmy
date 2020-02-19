import React from 'react';
import Header from './Header';
import Home from './pages/Home';

import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
      </main>
    </>
  );
}

export default App;
