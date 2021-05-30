import './Movies.css';

import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { MoviesApiInstance } from '../../utils/MoviesApi';

export default function Movies(props) {

  const [moviesData, setMoviesData] = React.useState([]);
  const [showMoviesCount, setMoviesCount] = React.useState(8);

  const [moviesCards, setMoviesCards] = React.useState([]);

  const initMoviesPage = () => {
    MoviesApiInstance.getMovies()
      .then((movies) => {
        if (movies) {
          setMoviesData(movies);
        }
        else {
          throw new Error('Не получилось скачать данные фильмов. Перезагрузите страницу.')
        }
      })
      .catch((e) => {
        //вызвать обработчик ошибок
        console.log(e);
      })
  }

  React.useEffect(() => {
    initMoviesPage();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setMoviesCards(moviesData.slice(0, showMoviesCount));
  }, [showMoviesCount, moviesData]);

  return (
    <div className='movies'>
      <div className='movies__content'>
        <Header className='movies__header' />
        <SearchForm className='movies__search-form' />
        <MoviesCardList
        className='movies__movies-card-list'
        savedMode={props.savedMode}
        moviesCards={moviesCards}
        handleCardClick={props.handleCardClick}
        />
        {!props.savedMode &&
          <Preloader className='movies__preloader' />
        }
        <Footer className='movies__footer' />
      </div>
    </div>
  )
}
