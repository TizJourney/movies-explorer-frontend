import classnames from 'classnames';

import form_logo from '../../images/form-logo.png';

import './Register.css';
import React, { useState } from 'react';

import Footer from '../Footer/Footer';

function FormTitle(props) {
  return (
    <div  className={classnames('form-title', props.className)}>
      <img src={form_logo} className='form-title__icon' alt='Иконка формы' />
      <h2 className='form-title__title'>{props.title}</h2>
    </div>
  )
}

function FormInput(props) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div  className={classnames('form-input', props.className)}>
      <p className='form-input__title'>{props.title}</p>
      <input className='form-input__input' value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
    </div>
  )
}

export default function Register(props) {
  return (
    <div className='register'>
      <div className='register__content'>
        <FormTitle className='register__header' title='Добро пожаловать!' />
        <FormInput className='register__input' title='Имя' />
        <FormInput className='register__input' title='E-mail' />
        <FormInput className='register__input' title='Пароль' />
        <Footer className='movies__footer movies__item' />
      </div>
    </div>
  )
}
