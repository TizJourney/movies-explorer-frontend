import './Register.css';

import { FormTitle, FormInput, FormButton, FormHelper, FormError } from '../Form/Form.js';

import classnames from 'classnames';
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  // eslint-disable-next-line no-useless-escape
  name: Joi.string().required().min(3).max(30).regex(/^[a-zA-Zа-яА-Я \\-]+$/u, 'format')
    .messages({
      "string.min": "Минимальная длина имени 3",
      "string.max": "Максимальная длина имени 30",
      "string.empty": "Поле обязательно для заполнения",
      "string.pattern.name": "Поле должно содержать только кирилицу, латиницу, пробел или дефис",
    }),
  email: Joi.string ().email({ tlds: { allow: false } }).required()
    .messages({
      "string.email": "Должен быть валидный email",
      "string.empty": "Поле обязательно для заполнения",
    }),
  password: Joi.string().required().min(3)
    .messages({
      "string.min": "Пароль должен быть минимум длины 3",
      "string.empty": "Поле обязательно для заполнения",
    }),
});


export default function Register(props) {
  const [isDisabled, setIsDisabled] = React.useState(true);

  const methods = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
  });

  function onSubmit({name, email, password}) {
    props.handleRegister(name, email, password);
  };

  function onChange() {
    const formValues = methods.getValues();
    setIsDisabled(
      Object.keys(methods.formState.errors).length > 0 ||
      !formValues.name ||
      !formValues.email ||
      !formValues.password
      );
  }

  return (
    <div className='register'>
      <FormProvider {...methods} >
        <form className='register__content' name='register-form' onChange={onChange} onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTitle className='register__header' title='Добро пожаловать!' />
          <FormInput
            className='register__input'
            title='Имя'
            name='name'
            type='text'
            error={methods.formState.errors.name}
          />
          <FormInput
            className='register__input'
            title='E-mail'
            name='email'
            type='text'
            error={methods.formState.errors.email}
          />
          <FormInput
            className='register__input'
            title='Пароль'
            name='password'
            type='password'
            error={methods.formState.errors.password}
          />
          <div className='register__submit-block'>
            { props.info &&
              <FormError className='register__error' info={props.info} />
            }
            <FormButton className={classnames('register__button')} isDisabled={isDisabled} title='Зарегистрироваться' />
            <FormHelper
              className='register__helper'
              title='Уже зарегистрированы?'
              buttonTitle='Войти'
              linkTo='signin'
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
