import './Login.css';

import { FormTitle, FormInput, FormButton, FormHelper } from '../Form/Form.js';
import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import React from 'react';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required()
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

export default function Login(props) {
  const [isDisabled, setIsDisabled] = React.useState(true);

  const methods = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
  });

  function onChange() {
    setIsDisabled(Object.keys(methods.formState.errors).length > 0);
  }


  const onSubmit = ({email, password}) => {
    props.handleLogin(email, password);
  };

  return (
    <div className='login'>
      <FormProvider {...methods} >
        <form name='login-form' className='login__content' onChange={onChange} onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTitle className='login__header' title='Рады видеть!' />
          <FormInput
            className='login__input'
            title='E-mail'
            name='email'
            type='email'
            error={methods.formState.errors.email}
          />

          <FormInput
            className='login__input'
            title='Пароль'
            name='password'
            type='password'
            error={methods.formState.errors.password}
          />
          <FormButton className='login__button' isDisabled={isDisabled} title='Войти'/>
          <FormHelper
            className='login__helper'
            title='Ещё не зарегистрированы?'
            buttonTitle='Регистрация'
            linkTo='signup'
          />
        </form>
      </FormProvider>
    </div>
  )
}
