import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import scrollToSection from '../../hooks/ScrollToSection';

export default function Header() {
  const toPostForm = () => {
    scrollToSection('postForm');
  };
  const toUsers = () => {
    scrollToSection('users');
  };
  return (
    <header className="header container">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-buttons">
        <button onClick={toUsers} className="btn yellow_mod">
          Users
        </button>
        <button onClick={toPostForm} className="btn yellow_mod">
          Sign up
        </button>
      </div>
    </header>
  );
}
