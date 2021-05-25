import './Student.css';
import promo_logo from '../../images/student-photo.jpg';

import React from 'react';

import classnames from 'classnames';

export default function Student(props) {
  return (
    <div className={classnames('student', props.className)}>
      <div className='student__text-blocks'>
        <h3 className='student__title'>Константин</h3>
        <p className='student__subtitle'>Фронтенд-разработчик, 36 лет</p>
        <p className='student__text'>Родился и вырос в городе Кирове. Поступил и закончил Московский Государственный Университет и с тех пор живу в Москве. Программирование давно явлется моей профессией. В общем виде мой опыт работы равен около 11 лет.</p>
        <div className='student__links-block'>
          <a href='https://www.facebook.com/konstantin.bondar.7' target='_blank' rel='noreferrer' className='student__link'>Facebook</a>
          <a href='https://github.com/TizJourney/' target='_blank' rel='noreferrer' className='student__link' >Github</a>
        </div>
      </div>
      <img className="student__photo" src={promo_logo} alt='Фото студента' />
    </div>
  )
}
