import classnames from 'classnames';

import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {

  const linkClassName = `header__link ${props.darkTheme && 'header__link_dark'}`;

  return (
    <header className={classnames(props.className, 'header')}>
      <Link to='profile' className={linkClassName}>profile</Link>
      <Link to='signin' className={linkClassName}>login</Link>
      <Link to='signup' className={linkClassName}>register</Link>
      <Link to='saved-movies' className={linkClassName}>saved-movies</Link>
      <Link to='movies' className={linkClassName}>movies</Link>
      <Link to='/' className={linkClassName}>main</Link>
    </header>
  )
}
