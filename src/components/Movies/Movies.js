import './Movies.css';

import React from 'react';

// import SitePage from '../SitePage/SitePage';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


export default function Movies(props) {

  function handleMoreButton() {
    props.handleMoreButton();
  }

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
        {
          props.searchRequest && props.moviesCards.length === 0 &&
          <p className='movies__nothing-found'>Ничего не найдено</p>
        }
        {
          props.moviesCards.length > 0 &&
          <MoviesCardList
          className='movies__movies-card-list'

          cardsColumns={props.cardsColumns}
          savedMode={props.savedMode}

          moviesCards={props.moviesCards}
          savedMovieIds={props.savedMovieIds}

          handleCardClick={props.handleCardClick}
          handleSaveMovie={props.handleSaveMovie}
          handleRemoveMovie={props.handleRemoveMovie}
          />
        }

        {
          props.isPreloaderActive &&
          <Preloader className='movies__preloader' />
        }

        { !props.savedMode && props.isMoreButtonActive &&
          <div>
            <button className='movies__more-button' onClick={handleMoreButton}>Ещё</button>
          </div>
        }
        <Footer className='movies__footer' />
      </div>
    </div>
  )
}
