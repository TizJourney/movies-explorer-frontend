import classnames from 'classnames';

import './MoviesCardList.css';

import React from 'react';

export default function MoviesCardList(props) {
  return (
    <div className={classnames('movies-card-list', props.className)}>
      <p className='movies-card-list__content'>movies card list placeholder</p>
    </div>
  )
}
