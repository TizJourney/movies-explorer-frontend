import classnames from 'classnames';

import form_logo from '../../images/form-logo.png';

import './Register.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

function FormButton(props) {
  return (
    <button className={classnames('form-button', props.className)}>{props.title}</button>
  )
}

function FormHelper(props) {
  return (
    <div  className={classnames('form-helper', props.className)}>
      <p className='form-helper__text'>{props.title}</p>
      <Link to={props.linkTo} className='form-helper__button'>{props.buttonTitle}</Link>
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
        <FormButton className='register__button' title='Зарегистрироваться' />
        <FormHelper
          className='register__helper'
          title='Уже зарегистрированы?'
          buttonTitle='Войти'
          linkTo='signin'
        />
        <Footer className='movies__footer movies__item' />
      </div>
    </div>
  )
}
