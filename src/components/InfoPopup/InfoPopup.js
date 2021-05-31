import './InfoPopup.css';

import React from 'react';

export default React.memo(function InfoPopup(props) {
  return (
    <div className={'info-popup'}>
      { props.title &&
        <h2 className='info-popup__title'>{props.title}</h2>
      }
      <p className='info-popup__message'>{props.message ? props.message : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</p>
  </div>
  )
})
