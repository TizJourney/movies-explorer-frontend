import classnames from 'classnames';

import './MoviesCard.css';

import React from 'react';

export default function MoviesCard(props) {
  return (
    <li className={classnames('movies-card', props.className)}>
      <div className='movies-card__info'>
        <div className='movies-card__text-blocks'>
          <h2 className='movies-card__title'>{props.title}</h2>
          <p className='movies-card__title'>{props.duration}</p>
        </div>
        <button className='movies-card__button' />
      </div>
      <img src={props.image} className='movies-card__info' alt={props.title}/>
    </li>
  )
}
