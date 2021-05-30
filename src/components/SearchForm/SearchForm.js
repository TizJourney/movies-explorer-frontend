import classnames from 'classnames';

import './SearchForm.css';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [inputValue, setInputValue] = useState('');

  const onSubmit = (values) => {
    //todo
  };

  const disableClassName = errors.searchField ? 'search-form__submit-button_disable' : null;

  return (
    <div className={classnames('search-form', props.className)}>
      <form name='searchForm' className='search-form__widget' onSubmit={handleSubmit(onSubmit)}>
        <input
          name='searchField'
          input="text"
          className='search-form__input'
          placeholder='Фильмы'
          value={inputValue.value}
          onChange={e => setInputValue(e.target.value)
          }
          {...register('searchField', { required: true })}
        />
        <button className={classnames('search-form__submit-button', disableClassName)} disabled={errors.searchField}>Найти</button>
      </form>
      <FilterCheckbox className='search-form__filter' />
    </div>
  )
}
