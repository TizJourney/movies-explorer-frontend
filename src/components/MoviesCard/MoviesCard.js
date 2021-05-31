import classnames from 'classnames';

import './MoviesCard.css';

import React, { useState } from 'react';

export default function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(props.saved);
  const [isHovored, setIsHovered] = useState(false);

  const extraButtonClassName = isHovored ? (isSaved ? 'movies-card__button_remove' : 'movies-card__button_save') : (isSaved && !props.savedMode ? 'movies-card__button_saved' : null);

  function handleSaveClick() {
    if (isSaved) {
      props.handleRemoveMovie(props.movieData.id);
    } else {
      props.handleSaveMovie(props.movieData);
    }
    setIsSaved(!isSaved);
  };

  function handleTrailerClick() { props.handleCardClick(props.trailerUrl); }

  return (
    <li className={classnames('movies-card', props.className)}>
      <div className='movies-card__image-container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <button className='movies-card__image-button'>
          <img src={props.image} className='movies-card__image' alt={props.title} onClick={handleTrailerClick} />
        </button>
        <button className={classnames('movies-card__button', extraButtonClassName )} onClick={handleSaveClick} />
      </div>
      <div className='movies-card__text-blocks'>
          <h2 className='movies-card__title'>{props.title}</h2>
          <p className='movies-card__duration'>{props.duration > 60 && `${Math.floor(props.duration /60)} ч`} {`${Math.floor(props.duration % 60)} м`} </p>
        </div>
    </li>
  )
}
