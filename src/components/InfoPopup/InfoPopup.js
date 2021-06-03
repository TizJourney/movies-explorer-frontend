import './InfoPopup.css';

import React from 'react';
import classnames from 'classnames';

export default React.memo(function InfoPopup({info}) {
  const infoClassName = !info.alert ? 'info-popup_info' : null;
  return (
    <div className={classnames('info-popup', infoClassName)}>
      { info.title &&
        <h2 className='info-popup__title'>{info.title}</h2>
      }
      <p className='info-popup__message'>{info.message ? info.message : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}</p>
  </div>
  )
})
