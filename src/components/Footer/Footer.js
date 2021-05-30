import classnames from 'classnames';

import './Footer.css';

import React from 'react';

export default React.memo(function Footer(props) {
  return (
    <footer className={classnames('footer', props.className)}>
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__text-container">
        <p className="footer__text">&copy; 2021</p>
        <nav className="footer__link-block">
          <a href='https://praktikum.yandex.ru' className='footer__link' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          <a href='https://github.com/TizJourney' className='footer__link' target='_blank' rel='noreferrer'>Github</a>
          <a href='https://www.facebook.com/konstantin.bondar.7' className='footer__link' target='_blank' rel='noreferrer'>Facebook</a>
        </nav>
      </div>
    </footer>
  )
})
