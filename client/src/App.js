import React from 'react';
import Header from './components/Header';
import { StoreProvider } from './store';

import './App.css'
import Routes from './routes';

function App() {
  return (
    <StoreProvider>
      <Header />
      <main className="main">
        <Routes />
      </main>
    </StoreProvider>
  );
}

export default App;
