import classnames from 'classnames';

import './MoviesCard.css';

import React, { useState } from 'react';

export default function MoviesCard(props) {
  const [isActive, setActive] = useState(props.saved);
  const [isHovored, setIsHovered] = useState(false);

  const extraButtonClassName = isHovored ? (isActive ? 'movies-card__button_remove' : 'movies-card__button_save') : (isActive && !props.savedMode ? 'movies-card__button_saved' : null);

  function toggleClass() {
    setActive(!isActive);
  };

  function handleClick() { props.handleCardClick(props.trailerUrl); }

  return (
    <li className={classnames('movies-card', props.className)}>
      <div className='movies-card__image-container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <button className='movies-card__image-button'>
          <img src={props.image} className='movies-card__image' alt={props.title} onClick={handleClick} />
        </button>
        <button className={classnames('movies-card__button', extraButtonClassName )} onClick={toggleClass} />
      </div>
      <div className='movies-card__text-blocks'>
          <h2 className='movies-card__title'>{props.title}</h2>
          <p className='movies-card__duration'>{props.duration > 60 && `${Math.floor(props.duration /60)} ч`} {`${Math.floor(props.duration % 60)} м`} </p>
        </div>
    </li>
  )
}
