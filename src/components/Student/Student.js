import './Student.css';
import promo_logo from '../../images/promo-logo.svg';

import { Link } from 'react-router-dom';

import React from 'react';

export default function Student(props) {
  return (
    <div className='student'>
      <div className='student__info student-info'>
        <div className='student__info student-info'>
          <div className='student-info__container'>
            <div className='student-info__text-blocks'>
              <h3 className='student-info__title'>Константин</h3>
              <p className='student-info__subtitle'>Фронтенд-разработчик, 36 лет</p>
              <p className='student-info__text'>Родился и вырос в городе Кирове. Поступил и закончил Московский Государственный Университет и с тех пор живу в Москве.</p>
              <p className='student-info__text'>Программирование давно явлется моей профессией. В общем виде мой стаж равен около 11 лет.</p>
              <div className='student-info__links-block'>
                <a href='https://www.facebook.com/konstantin.bondar.7' target='_blank' rel='noreferrer' className='student-info__link'>Facebook</a>
                <a href='https://github.com/TizJourney/' target='_blank' rel='noreferrer' className='student-info__link' >Github</a>
              </div>
            </div>
            <img className="student-info__photo" src={promo_logo} alt='Фото студента' />
          </div>

        </div>
      </div>

    </div>
  )
}
