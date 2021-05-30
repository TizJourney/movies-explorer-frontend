import classnames from 'classnames';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import imageFilmExample from '../../images/example-film-pic.png';

import React from 'react';

export default function MoviesCardList(props) {
  return (
    <ul className={classnames('movies-card-list', props.className)}>
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode} saved={true}/>
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode} saved={true}/>
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode} saved={true}/>
      { !props.savedMode && <MoviesCard className='movies-card-list__card' title='33 слова о дизайне' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/> }
      <MoviesCard className='movies-card-list__card' title='Очень длинное название фильма, которое точно не поместится' duration='1ч 47м' image={imageFilmExample} savedMode={props.savedMode}/>
    </ul>
  )
}
