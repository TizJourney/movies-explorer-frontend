import classnames from 'classnames';

import form_logo from '../../images/form-logo.png';

import './Form.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function FormTitle(props) {
  return (
    <div  className={classnames('form-title', props.className)}>
      <Link to='/' className='form-title__link'><img src={form_logo} className='form-title__icon' alt='Иконка формы' /></Link>
      <h2 className='form-title__title'>{props.title}</h2>
    </div>
  )
}

export function FormInput(props) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div  className={classnames('form-input', props.className)}>
      <p className='form-input__title'>{props.title}</p>
      <div className='form-input__container' >
        <input className='form-input__input' value={inputValue.value} onChange={e => setInputValue(e.target.value)} />
        <p className='form-input__input-error' >Текст ошибки</p>
      </div>
    </div>
  )
}

export function FormButton(props) {
  return (
    <button className={classnames(props.className, 'form-button')}>{props.title}</button>
  )
}

export function FormHelper(props) {
  return (
    <div  className={classnames('form-helper', props.className)}>
      <p className='form-helper__text'>{props.title}</p>
      <Link to={props.linkTo} className='form-helper__button'>{props.buttonTitle}</Link>
    </div>
  )
}
