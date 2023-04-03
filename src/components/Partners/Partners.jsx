import React from 'react';
import PartnersItem from './PartnersItem';

export default function Partners({ partners, setPage, page }) {
  return (
    <section id="users">
      <div className="partners container">
        <h2 className="partners_title">Working with GET request</h2>
        {partners ? (
          <ul className="partners_list">
            {partners.map(partner => (
              <PartnersItem key={partner.id} partner={partner} />
            ))}
          </ul>
        ) : null}
        {page >= 9 ? (
          <button className="partners_btn disable_mod" disabled>
            Show more
          </button>
        ) : (
          <button
            className="partners_btn yellow_mod"
            onClick={() => setPage(prevState => prevState + 1)}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
