import classnames from 'classnames';

import './Form.css';
import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useFormContext } from "react-hook-form";


export function FormTitle(props) {
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }

  return (
    <div className={classnames('form-title', props.className)}>
      <button className='form-title__link' onClick={handleClick}/>
      <h2 className='form-title__title'>{props.title}</h2>
    </div>
  )
}

export function FormInput(props) {
  const { register } = useFormContext();

  return (
    <div className={classnames('form-input', props.className)}>
      <p className='form-input__title'>{props.title}</p>
      <div className='form-input__container' >
        <input className='form-input__input' type={props.type} name={props.name} {...register(props.name)} disabled={props.isInputBlocked} />
        {props.error && <p className='form-input__input-error'> {props.error.message} </p>}
      </div>
    </div>
  )
}

export function FormButton(props) {
  return (
    <button type="submit" className={classnames(props.className, 'form-button', props.isDisabled ? 'form-button_disable' : null)} disabled={props.isDisabled}>{props.title}</button>
  )
}

export function FormError(props) {
  return (
    <div className={classnames('form-error', props.className)}>
      <h2 className='form-error__text'>{props.info.message}</h2>
    </div>
  )
}

export function FormHelper(props) {
  return (
    <div className={classnames('form-helper', props.className)}>
      <p className='form-helper__text'>{props.title}</p>
      <Link to={props.linkTo} className='form-helper__button'>{props.buttonTitle}</Link>
    </div>
  )
}
