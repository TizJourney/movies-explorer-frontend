import classnames from 'classnames';

import './Preloader.css';

import React from 'react';

export default function Preloader(props) {
  return (
    <div className={classnames(props.className, 'preloader')}>
          <button className='preloader__button'>Ещё</button>
    </div>
  )
}
