import React from 'react';
import FormatedPhone from '../../hooks/FormatedPhone';

export default function PartnersItem({ partner }) {
  const { photo, name, position, email, phone } = partner;
  const formatedPhone = FormatedPhone(phone);
  return (
    <li className="partner-item">
      <div>
        <img className="partner-item_photo" src={photo} alt={name} />
      </div>
      <p className="partner-item_text">{name}</p>
      <div className="partner-item_cont">
        <p className="partner-item_text">{position}</p>
        <p className="partner-item_text">{email}</p>
        <p className="partner-item_text">{formatedPhone}</p>
      </div>
    </li>
  );
}
