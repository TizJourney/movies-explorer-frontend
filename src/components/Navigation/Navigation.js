import './Navigation.css';

import React from 'react';
import { Link } from 'react-router-dom';

import AccountButton from '../AccountButton/AccountButton.js';

export default function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen && "navigation_opened"}`}>
      <nav className='navigation__links-block header__links-block_auth'>
        <Link to='/' className='navigation__link navigation__link_main'>Главная</Link>
        <Link to='movies' className='navigation__link navigation__link_movies'>Фильмы</Link>
        <Link to='saved-movies' className='navigation__link hnavigation__link_saved-movies'>Сохранённые фильмы</Link>
      </nav>
      <Link to='profile' className='navigation__link navigation__link_account'><AccountButton className='header__account-logo' /></Link>
    </div>
  )
}
