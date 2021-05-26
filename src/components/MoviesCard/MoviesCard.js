import classnames from 'classnames';

import './MoviesCard.css';

import React, { useState } from 'react';

export default function MoviesCard(props) {
  const [isActive, setActive] = useState(props.saved);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <li className={classnames('movies-card', props.className)}>
      <div className='movies-card__info'>
        <div className='movies-card__text-blocks'>
          <h2 className='movies-card__title'>{props.title}</h2>
          <p className='movies-card__duration'>{props.duration}</p>
        </div>
        <button className={classnames('movies-card__button', isActive ? 'movies-card__button_saved': null )} onClick={toggleClass} />
      </div>
      <img src={props.image} className='movies-card__info' alt={props.title} />
    </li>
  )
}
