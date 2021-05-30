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
        <Header className='movies__header' />
        <SearchForm
          className='movies__search-form'
          searchRequest={props.searchRequest}
          handleSearchRequest={props.handleSearchRequest}

          filterState={props.filterState}
          handleFilterStateChange={props.handleFilterStateChange}
      />
        <MoviesCardList
        className='movies__movies-card-list'
        savedMode={props.savedMode}
        moviesCards={props.moviesCards}
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
