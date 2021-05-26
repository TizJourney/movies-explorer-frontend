import classnames from 'classnames';

import './SearchForm.css';

import React from 'react';

function FilterCheckbox(props) {
  return (
    <div className='search-form__filter-container'>
      <p className='search-form__widget-title'>Короткометражки</p>
      <input type="checkbox" className='search-form__filter-checkbox'></input>
    </div>
  )
}

function SearchFormButton(props) {
  return (
    <button className='search-form__submit-button' />
  )
}


export default function SearchForm(props) {
  return (
    <div className={classnames('search-form', props.className)}>
      <p className='search-form__content'>search-form Left Block</p>
      <SearchFormButton />
      <FilterCheckbox />
    </div>
  )
}
