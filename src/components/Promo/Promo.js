import './Promo.css';

import React from 'react';

import NavTab from '../NavTab/NavTab';
import classnames from 'classnames';

export default function Promo(props) {
  return (
    <div className={classnames('promo', props.className)}>
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab className="promo__nav-tab"/>
    </div>
  )
}
