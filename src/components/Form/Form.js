import classnames from 'classnames';

import './Form.css';
import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useFormContext } from "react-hook-form";


export function FormTitle(props) {
  const history = useHistory();

  return (
    <div className={classnames('form-title', props.className)}>
      <button className='form-title__link' onClick={() =>{history.push('/');}}/>
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
        <input className='form-input__input' type={props.type} name={props.name} {...register(props.name)} />
        {props.error && <p className='form-input__input-error'> {props.error.message} </p>}
      </div>
    </div>
  )
}

export function FormButton(props) {
  return (
    <button type="submit" className={classnames(props.className, 'form-button')} >{props.title}</button>
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
