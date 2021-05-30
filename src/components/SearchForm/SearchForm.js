import classnames from 'classnames';

import './SearchForm.css';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function FilterCheckbox(props) {
  const [isActive, setActive] = useState(props.filterState);

  const toggleFilter = () => {
    props.handleFilterStateChange(!props.filterState);
    setActive(!props.filterState);
  };

  return (
    <div className={classnames('search-form__filter-container', props.className)}>
      <button className={classnames('search-form__filter-button', isActive ? null : 'search-form__filter-button_disable')} onClick={toggleFilter} />
      <p className='search-form__filter-title'>Короткометражки</p>
    </div>
  )
}

export default function SearchForm(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const disableClassName = errors.searchField ? 'search-form__submit-button_disable' : null;

  const onSubmit = (values) => {
    props.handleSearchRequest(values.searchField);
  };

  return (
    <div className={classnames('search-form', props.className)}>
      <form name='searchForm' className='search-form__widget' onSubmit={handleSubmit(onSubmit)}>
        <input
          name='searchField'
          input="text"
          className='search-form__input'
          placeholder='Фильмы'
          defaultValue={props.searchRequest}
          {...register('searchField', { required: true })}
        />
        <button className={classnames('search-form__submit-button', disableClassName)} disabled={errors.searchField}>Найти</button>
      </form>
      <FilterCheckbox
        className='search-form__filter'
        filterState={props.filterState}
        handleFilterStateChange={props.handleFilterStateChange}
      />
    </div>
  )
}
