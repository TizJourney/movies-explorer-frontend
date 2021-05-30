import classnames from 'classnames';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import { apiMoviesBaseUrl } from '../../utils/utils';

import React from 'react';

export default function MoviesCardList(props) {
  return (
    <ul className={classnames('movies-card-list', props.className)}>
      {props.moviesCards.map((card) => (
            <MoviesCard
              key={card.id}
              className='movies-card-list__card'
              title={card.nameRU}
              duration={card.duration}
              image={`${apiMoviesBaseUrl}${card.image.url}`}
              trailerUrl={card.trailerLink}
              savedMode={props.savedMode}
              handleCardClick={props.handleCardClick}
              // onCardSave={props.onCardSave}
              // onCardDelete={props.onCardDelete}
            />
          ))}
    </ul>
  )
}
