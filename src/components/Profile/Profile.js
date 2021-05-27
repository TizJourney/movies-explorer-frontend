import classnames from 'classnames';

import './Profile.css';

import Header from '../Header/Header';

import React, { useState } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function ProfileInput(props) {
  const [inputValue, setInputValue] = useState(props.value);

  return (
    <div className={classnames('profile-input', props.className)}>
      <div className='profile-input__container' >
        <p className='profile-input__title'>{props.title}</p>
        <input className='profile-input__input' defaultValue={inputValue} value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
      </div>
      <p className='profile-input__input-error'>Текст ошибки</p>
    </div>
  )
}

export default function Profile(props) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <div className='profile'>
      <div className='profile__content'>
        <Header className='profile__header' />
        <div className='profile__body'>
          <h2 className='profile__title'>{userContext.name}</h2>
          <ProfileInput className='profile__input profile__input_bottom-divider' title='E-mail' value={userContext.email} />
          <ProfileInput className='profile__input' title='Пароль' value={userContext.password} />
          <button className='profile__button'>Редактировать</button>
          <button className='profile__button profile__button_logout' onClick={props.handleLogout}>Выйти из аккаунта</button>
        </div>
      </div>
    </div >
  )
}
