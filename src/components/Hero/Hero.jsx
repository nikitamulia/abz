import React from 'react';
import './_hero.scss';

export default function Hero() {
  return (
    <div className="hero">
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
      <button className="hero_container-btn yellow_mod">Sign up</button>
    </div>
  );
}
