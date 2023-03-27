import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';

export default function Header() {
  return (
    <header className="header container">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-buttons">
        <button className="btn yellow_mod">Users</button>
        <button className="btn yellow_mod">Sign up</button>
      </div>
    </header>
  );
}
