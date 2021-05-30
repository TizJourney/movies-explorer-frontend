import './Portfolio.css';

import React from 'react';

import classnames from 'classnames';

function PortofolioLink(props) {
  return (
    <a href={props.link} className='portfolio__link-block portfolio-link' target='_blank' rel='noreferrer'>
      <p className='portfolio-link__link-text'>{props.children}</p>
      <p className='portfolio-link__link-text'>↗</p>
    </a>
  )
}

export default function Portofolio(props) {
  return (
    <div className={classnames('portfolio', props.className)}>
      <h3 className='portfolio__title'>Портфолио</h3>
      <div className='portfolio__links-blocks'>
        <PortofolioLink link='https://github.com/TizJourney/how-to-learn'>Статичный сайт</PortofolioLink>
        <PortofolioLink link='https://tizjourney.github.io/russian-travel/'>Адаптивный сайт</PortofolioLink>
        <PortofolioLink link='http://tizjourney-mesto.nomoredomains.club/sign-in'>Одностраничное приложение</PortofolioLink>
      </div>
    </div>
  )
}
