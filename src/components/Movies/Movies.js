import './Movies.css';

import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { moviesApiInstance } from '../../utils/api';

export default function Movies(props) {

  const [filmsData, setFilmsData] = React.useState({});

  const initMoviesPage = () => {
    moviesApiInstance.getMovies()
      .then((movies) => {
        if (movies) {
          setFilmsData(movies)
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

  return (
    <div className='movies'>
      <div className='movies__content'>
        <Header className='movies__header' />
        <SearchForm className='movies__search-form' />
        <MoviesCardList className='movies__movies-card-list' savedMode={props.savedMode} />
        {!props.savedMode &&
          <Preloader className='movies__preloader' />
        }
        <Footer className='movies__footer' />
      </div>
    </div>
  )
}
