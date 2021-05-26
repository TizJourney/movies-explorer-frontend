import './Movies.css';

import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Movies(props) {
  return (
    <div className='movies'>
      <div className='movies__content'>
        <Header className='movies__header movies__item' />
        <SearchForm className='movies__search-form movies__item' />
        <MoviesCardList className='movies__movies-card-list movies__item' />
        <Preloader className='movies__preloader movies__item' />
        <Footer className='movies__footer movies__item' />
      </div>
    </div>
  )
}
