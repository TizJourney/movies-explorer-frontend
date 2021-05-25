import './Portfolio.css';

import React from 'react';

import classnames from 'classnames';

export default function Portofolio(props) {
  return (
    <div className={classnames('portfolio', props.className)}>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__links-blocks'>
        <li className='link'>Статичный сайт</li>
        <li className='link'>Адаптивный сайт</li>
        <li className='link'>Одностраничное приложение</li>
      </ul>
    </div>
  )
}
