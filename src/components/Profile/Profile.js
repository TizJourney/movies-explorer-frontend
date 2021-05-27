import classnames from 'classnames';

import './Profile.css';

import Header from '../Header/Header';

import React, { useState } from 'react';

export function ProfileInput(props) {
  const [inputValue, setInputValue] = useState(props.value);

  return (
    <div  className={classnames('profile-input', props.className)}>
      <div className='profile-input__container' >
        <p className='profile-input__title'>{props.title}</p>
        <input className='profile-input__input' defaultValue={inputValue} value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
      </div>
      <p className='profile-input__input-error'>Текст ошибки</p>
    </div>
  )
}

export default function Login(props) {
  return (
    <div className='profile'>
      <Header className='profile__header'/>
      <div className='profile__content'>
        <h2 className='profile__title'>Привет, Константин!</h2>
        <ProfileInput className='profile__input profile__input_bottom-divider' title='E-mail' value='Константин' />
        <ProfileInput className='profile__input' title='Пароль' value='example@mail.ru' />
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_logout'>Выйти из аккаунт</button>
      </div>
    </div>
  )
}
