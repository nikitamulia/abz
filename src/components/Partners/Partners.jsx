import React from 'react';
import PartnersItem from './PartnersItem';

export default function Partners({ partners }) {
  return (
    <div className="partners container">
      <h2 className="partners_title">Working with GET request</h2>
      {partners ? (
        <ul className="partners_list">
          {partners.map(partner => (
            <PartnersItem key={partner.id} partner={partner} />
          ))}
        </ul>
      ) : null}
      <button className="partners_btn yellow_mod">Show more</button>
    </div>
  );
}
