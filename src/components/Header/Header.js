import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {

  return (
    <header className='header'>
      <Link to='' className='header__link'></Link>
      <Link to='movies' className='header__link'>movies</Link>
      <Link to='saved-movies' className='header__link'>saved-movies</Link>
      <Link to='profile' className='header__link'>profile</Link>
      <Link to='/' className='header__link'>main</Link>
      <Link to='signin' className='header__link'>login</Link>
      <Link to='signup' className='header__link'>register</Link>
    </header>
  )
}
