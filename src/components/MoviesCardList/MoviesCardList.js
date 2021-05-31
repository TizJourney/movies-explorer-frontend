import classnames from 'classnames';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import { API_MOVIES_BASE_URL } from '../../utils/utils';

import React from 'react';

export default function MoviesCardList(props) {

  const columnsToClass = {
    1: 'movies-card-list_1-column',
    2: 'movies-card-list_2-columns',
    3: 'movies-card-list_3-columns',
  }
  return (
    <ul className={classnames('movies-card-list', columnsToClass[props.cardsColumns], props.className)}>
      {props.moviesCards.map((card) => (
            <MoviesCard
              key={card.id}
              className='movies-card-list__card'
              title={card.nameRU}
              duration={card.duration}
              image={`${API_MOVIES_BASE_URL}${card.image.url}`}
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
