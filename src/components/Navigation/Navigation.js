import './Navigation.css';

import React from 'react';

import AccountButton from '../AccountButton/AccountButton.js';

export default function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen && "navigation_opened"}`}>
      <div className='navigation__internal-content' >
        <nav className='navigation__links-block header__links-block_auth'>
          <button className='navigation__link navigation__link_main'>Главная</button>
          <button to='movies' className='navigation__link navigation__link_movies'>Фильмы</button>
          <button to='saved-movies' className='navigation__link hnavigation__link_saved-movies'>Сохранённые фильмы</button>
        </nav>
        <button to='profile' className='navigation__link navigation__link_account'><AccountButton className='header__account-logo' /></button>
      </div>
    </div >
  )
}
