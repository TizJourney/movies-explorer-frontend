import classnames from 'classnames';

import './Tech.css';

import React from 'react';

export default function Tech(props) {
  return (
    <div className={classnames('tech', props.className)}>
      <h3 className='tech__title'>7 технологий</h3>
      <p className='tech__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='tech__tech-items tech-items'>
        <li className='tech-items__item'>HTML</li>
        <li className='tech-items__item'>CSS</li>
        <li className='tech-items__item'>JS</li>
        <li className='tech-items__item'>React</li>
        <li className='tech-items__item'>Git</li>
        <li className='tech-items__item'>Express.js</li>
        <li className='tech-items__item'>mongoDB</li>
      </ul>

    </div>
  )
}
