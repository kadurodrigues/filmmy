import React from 'react';
import './Header.css'
import { useStore } from '../store';

function Header() {
  const { state: { user } } = useStore();

  return (
    <>
      <header className="header">
        <h1 className="title">Filmmy</h1>
        { user !== null && <div className="user-content">
          <p>Hello,</p> <strong>{user.firstName}</strong> 
        </div> }
      </header>
    </>
  )
}

export default Header;