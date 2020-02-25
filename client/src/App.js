import React from 'react';
import Header from './Header';
import Home from './pages/Home';
import AppContext from './contexts/appContext';

import './App.css'

function App() {
  return (
    <AppContext>
      <Header />
      <main className="main">
        <Home />
      </main>
    </AppContext>
  );
}

export default App;
