import classnames from 'classnames';

import './SearchForm.css';

import React, { useState } from 'react';

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
