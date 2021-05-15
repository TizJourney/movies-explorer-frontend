import './Promo.css';
import promo_logo from '../../images/promo-logo.svg';

import React from 'react';

export default function Promo(props) {
  return (
    <div className="promo">
      <img className="promo__logo" src={promo_logo} alt="Лого промо страницы"/>
      <h1 className="promo__title">Учебный проект студента веб разработки</h1>
    </div>
  )
}
