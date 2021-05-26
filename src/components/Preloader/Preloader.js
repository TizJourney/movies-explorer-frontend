import classnames from 'classnames';

import './Preloader.css';

import React from 'react';

export default function Preloader(props) {
  return (
    <div className={classnames('preloader', props.className)}>
      <p className='preloader__content'>preloader Placeholder</p>
    </div>
  )
}
