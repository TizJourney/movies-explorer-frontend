import './InfoPopup.css';

import React from 'react';

export default React.memo(function InfoPopup({info}) {
  return (
    <div className={'info-popup'}>
      { info.title &&
        <h2 className='info-popup__title'>{info.title}</h2>
      }
      <p className='info-popup__message'>{info.message ? info.message : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</p>
  </div>
  )
})
