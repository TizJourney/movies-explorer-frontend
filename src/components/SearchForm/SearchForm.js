import classnames from 'classnames';

import './SearchForm.css';

import React, { useState } from 'react';

function FilterCheckbox(props) {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className={classnames('search-form__filter-container', props.className)}>
      <button className={classnames('search-form__filter-button', isActive ? null : 'search-form__filter-button_disable')} onClick={toggleClass} />
      <p className='search-form__filter-title'>Короткометражки</p>
    </div>
  )
}

export default function SearchForm(props) {

  const [inputValue, setInputValue] = useState('');

  return (
    <div className={classnames('search-form', props.className)}>
        <div className='search-form__widget'>
          <input className='search-form__input' placeholder='Фильмы' value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
          <button className={classnames('search-form__submit-button', props.className)} >Найти</button>
        </div>
        <FilterCheckbox className='search-form__filter' />
    </div>
  )
}
