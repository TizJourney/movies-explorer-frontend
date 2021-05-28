import './Navigation.css';

import React from 'react';

import AccountButton from '../AccountButton/AccountButton.js';

export default function Navigation(props) {


  return (
    <div className={`navigation ${props.isOpen && "navigation_opened"}`}>
      <div className='navigation__overlay' ></div>
      <button className='navigation__close-button' onClick={() => {props.handleClose()} } />
      <div className='navigation__internal-content' >
        <nav className='navigation__links-block header__links-block_auth'>
          <button className='navigation__link navigation__link_main' onClick={() => {props.handleClick('/')} }>Главная</button>
          <button className='navigation__link navigation__link_movies' onClick={() => {props.handleClick('movies')} }> Фильмы</button>
          <button className='navigation__link hnavigation__link_saved-movies' onClick={() => {props.handleClick('saved-movies')} }>Сохранённые фильмы</button>
        </nav>
        <button className='navigation__link navigation__link_account' onClick={() => {props.handleClick('profile')} }><AccountButton className='header__account-logo'/></button>
      </div>
    </div >
  )
}
