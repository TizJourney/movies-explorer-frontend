import classnames from 'classnames';

import './SearchForm.css';

import React from 'react';

export default function SearchForm(props) {
  return (
    <div className={classnames('search-form', props.className)}>
      <p className='search-form__content'>search-form Placeholder</p>
    </div>
  )
}
