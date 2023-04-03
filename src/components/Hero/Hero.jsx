import React from 'react';
import scrollToSection from '../../hooks/ScrollToSection';

export default function Hero() {
  const onClick = () => {
    scrollToSection('postForm');
  };
  return (
    <div className="hero container">
      <h1 className="hero_container-title">
        Test assignment for front-end developer
      </h1>
      <p className="hero_container-text">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <button onClick={onClick} className="hero_container-btn yellow_mod">
        Sign up
      </button>
    </div>
  );
}
