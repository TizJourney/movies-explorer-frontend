import './NavTab.css';

import React from 'react';

import { HashLink } from 'react-router-hash-link';

export default function NavTab(props) {
  return (
    <header className='nav-tab'>
      <HashLink to='/#project' className='nav-tab__link'>О проекте</HashLink>
      <HashLink to='/#tech' className='nav-tab__link'>Технологии</HashLink>
      <HashLink to='/#me' className='nav-tab__link'>Студент</HashLink>
    </header>
  )
}
