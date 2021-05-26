import classnames from 'classnames';

import './MoviesCard.css';

import React, { useState } from 'react';

export default function MoviesCard(props) {
  const [isActive, setActive] = useState(props.saved);

  const activeClassName = props.savedMode ? 'movies-card__button_saved-mode_active' : 'movies-card__button_normal-mode_active';
  const disableClassName = props.savedMode ? 'movies-card__button_saved-mode_disable' : 'movies-card__button_normal-mode_disable';

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
        <button className={classnames('movies-card__button', isActive ? disableClassName : activeClassName )} onClick={toggleClass} />
      </div>
      <img src={props.image} className='movies-card__info' alt={props.title} />
    </li>
  )
}
