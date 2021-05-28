import classnames from 'classnames';

import './Header.css';

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import main_logo from '../../images/main-logo.png';


import Navigation from '../Navigation/Navigation.js';
import AccountButton from '../AccountButton/AccountButton.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function Header(props) {
  const history = useHistory();

  const userContext = React.useContext(CurrentUserContext);
  const extraLinkClassName = props.darkTheme ? 'header__link_dark' : null;

  const [isNavigationOpen, setNavigationStatus] = useState(false);

  const handleNavigationClose = () => {
    setNavigationStatus(false);
  };

  const setNavigationOpen = () => {
    setNavigationStatus(true);
  }

  const navigateToRoute = (route) => {
    history.push(route);
    setNavigationStatus(false);
  };



  return (
    <div>
      <header className={classnames(props.className, 'header')}>
        <Link to='/' className={'header__link header__link_main'}><img src={main_logo} alt='лого главной страницы' className='header__main-logo' /></Link>
        {userContext.logged &&
          <nav className='header__links-block header__links-block_auth'>
            <Link to='saved-movies' className={classnames('header__link header__link_saved-movies', extraLinkClassName)}>Сохранённые фильмы</Link>
            <Link to='movies' className={classnames('header__link header__link_movies', extraLinkClassName)}>Фильмы</Link>
          </nav>
        }

        {userContext.logged &&
          <Link to='profile' className={classnames('header__link header__link_account header__links-block_auth', extraLinkClassName)}>
            <AccountButton className='header__account-logo' />
          </Link>
        }

        {userContext.logged && <button className='header__burger' onClick={setNavigationOpen} />
        }

        {!userContext.logged &&
          <nav className='header__links-block header__links-block_unauth'>
            <Link to='signin' className={classnames('header__link header__link_login', extraLinkClassName)}>Войти</Link>
            <Link to='signup' className={classnames('header__link header__link_register', extraLinkClassName)}>Регистрация</Link>
          </nav>
        }
      </header>

      <Navigation isOpen={isNavigationOpen} handleClose={handleNavigationClose} handleClick={navigateToRoute} />
    </div>
  )
}
