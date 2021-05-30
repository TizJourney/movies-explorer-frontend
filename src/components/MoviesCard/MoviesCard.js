import classnames from 'classnames';

import './MoviesCard.css';

import React, { useState } from 'react';

export default function MoviesCard(props) {
  const [isActive, setActive] = useState(props.saved);
  const [isHovored, setIsHovered] = useState(false);

  const extraButtonClassName = isHovored ? (isActive ? 'movies-card__button_remove' : 'movies-card__button_save') : (isActive && !props.savedMode ? 'movies-card__button_saved' : null);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const handleClick = () => { props.handleCardClick(props.trailerUrl); }

  return (
    <li className={classnames('movies-card', props.className)}>
      <button className='movies-card__image-container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        >
        <img src={props.image} className='movies-card__image' alt={props.title} />
        <button className={classnames('movies-card__button', extraButtonClassName )} onClick={toggleClass} />
      </button>
      <div className='movies-card__text-blocks'>
          <h2 className='movies-card__title'>{props.title}</h2>
          <p className='movies-card__duration'>{props.duration > 60 && `${Math.floor(props.duration /60)} ч`} {`${Math.floor(props.duration % 60)} м`} </p>
        </div>
    </li>
  )
}
