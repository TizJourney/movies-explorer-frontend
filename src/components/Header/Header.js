import classnames from 'classnames';

import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import main_logo from '../../images/main-logo.png';
import account_logo from '../../images/account-logo.svg';

function AccountLogo(props) {
  return (
    <div className={classnames(props.className, 'account-logo')}>
      <p className='account-logo__text'>Аккаунт</p>
      <img className='account-logo__logo' src={account_logo} alt='Изображение лого аккаунта'/>
    </div>
  )
}

export default function Header(props) {

  const extraLinkClassName = props.darkTheme ? 'header__link_dark' : null;

  return (
    <header className={classnames(props.className, 'header')}>
      <Link to='/' className={'header__link header__link_main'}><img src={main_logo} alt='лого главной страницы' className='header__main-logo'/></Link>
      <nav className='header__links-block'>
        <Link to='profile' className={classnames('header__link header__link_account', extraLinkClassName)}><AccountLogo className='header__account-logo'/></Link>
        <Link to='movies' className={classnames('header__link header__link_movies',extraLinkClassName)}>Фильмы</Link>
        <Link to='saved-movies'className={classnames('header__link header__link_saved-movies',  extraLinkClassName)}>Сохранённые фильмы</Link>
      </nav>
    </header>
  )
}
