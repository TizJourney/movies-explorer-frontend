import classnames from 'classnames';

import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import main_logo from '../../images/main-logo.png';
import account_logo from '../../images/account-logo.svg';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function AccountLogo(props) {
  return (
    <div className={classnames(props.className, 'account-logo')}>
      <p className='account-logo__text'>Аккаунт</p>
      <img className='account-logo__logo' src={account_logo} alt='Изображение лого аккаунта' />
    </div>
  )
}

export default function Header(props) {
  const userContext = React.useContext(CurrentUserContext);
  const extraLinkClassName = props.darkTheme ? 'header__link_dark' : null;

  return (
    <header className={classnames(props.className, 'header')}>
      <Link to='/' className={'header__link header__link_main'}><img src={main_logo} alt='лого главной страницы' className='header__main-logo' /></Link>
      {userContext.logged &&
        <div className='header_mode-selector'>
          <nav className='header__links-block header__links-block_auth'>
            <Link to='profile' className={classnames('header__link header__link_account', extraLinkClassName)}><AccountLogo className='header__account-logo' /></Link>
            <Link to='saved-movies' className={classnames('header__link header__link_saved-movies', extraLinkClassName)}>Сохранённые фильмы</Link>
            <Link to='movies' className={classnames('header__link header__link_movies', extraLinkClassName)}>Фильмы</Link>
          </nav>
          <button className='header__burger' />
        </div>
      }
      {!userContext.logged &&
        <nav className='header__links-block header__links-block_unauth'>
          <Link to='signin' className={classnames('header__link header__link_login', extraLinkClassName)}>Войти</Link>
          <Link to='signup' className={classnames('header__link header__link_register', extraLinkClassName)}>Регистрация</Link>
        </nav>
      }
    </header>
  )
}
