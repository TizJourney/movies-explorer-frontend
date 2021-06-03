import classnames from 'classnames';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import React from 'react';

export default function MoviesCardList(props) {

  const columnsToClass = {
    1: 'movies-card-list_1-column',
    2: 'movies-card-list_2-columns',
    3: 'movies-card-list_3-columns',
  }
  return (
    <ul className={classnames('movies-card-list', columnsToClass[props.cardsColumns], props.className)}>
      {props.moviesCards.map((movieData) => (
            <MoviesCard
              key={movieData.movieId}
              className='movies-card-list__card'
              title={movieData.nameRU}
              duration={movieData.duration}
              image={movieData.image}
              trailerUrl={movieData.trailer}
              savedMode={props.savedMode}

              handleSaveMovie={props.handleSaveMovie}
              handleRemoveMovie={props.handleRemoveMovie}
              movieData={movieData}

              savedMovieIds={props.savedMovieIds}
            />
          ))}
    </ul>
  )
}
