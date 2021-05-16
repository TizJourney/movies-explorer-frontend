import './NavTab.css';

import React from 'react';

import { Link } from 'react-router-dom';

export default function NavTab(props) {
  return (
    <header className='nav-tab'>
      <Link to='profile' className='nav-tab__link'>О проекте</Link>
      <Link to='signin' className='nav-tab__link'>Технологии</Link>
      <Link to='signup' className='nav-tab__link'>Студент</Link>
    </header>
  )
}
