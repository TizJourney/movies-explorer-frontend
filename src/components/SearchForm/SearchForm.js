import classnames from 'classnames';

import './SearchForm.css';

import search_icon from '../../images/search-icon.png'

import React, { useState } from 'react';
import MediaQuery from "react-responsive";

function FilterCheckbox(props) {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className='search-form__filter-container'>
      <button className={classnames('search-form__filter-button', isActive ? null : 'search-form__filter-button_disable')} onClick={toggleClass} />
      <p className='search-form__widget-title'>Короткометражки</p>
    </div>
  )
}

function SearchFormButton(props) {
  return (
    <button className={classnames('search-form__submit-button', props.className)} />
  )
}


export default function SearchForm(props) {

  const [inputValue, setInputValue] = useState('');

  return (
    <div className={classnames('search-form', props.className)}>
      <MediaQuery query='screen and (min-width: 1280px)'>
        <div className='search-form__widget'>
          {!inputValue &&
            <div className='search-form__placeholder'>
              <img src={search_icon} className='search-form__placeholder-icon' alt='Изображение лупы' />
              <p className='search-form__placeholder-text'>Фильм</p>
            </div>
          }
          <input className='search-form__input' value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
          <SearchFormButton />
          <FilterCheckbox />
        </div>
      </MediaQuery>

      <MediaQuery query='screen and (max-width: 1279px)'>
        <div className='search-form__widget'>
          {!inputValue &&
            <div className='search-form__placeholder'>
              <img src={search_icon} className='search-form__placeholder-icon' alt='Изображение лупы' />
              <p className='search-form__placeholder-text'>Фильм</p>
            </div>
          }
          <input className='search-form__input' value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
          <SearchFormButton />
        </div>
        <FilterCheckbox className='search-form__filter-container_external' />
      </MediaQuery>
    </div>
  )
}
