import './Register.css';

import { FormTitle, FormInput, FormButton, FormHelper } from '../Form/Form.js';

import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().min(3).max(30)
    .messages({
      "string.min": "Минимальная длина имени 3",
      "string.max": "Максимальная длина имени 30",
      "string.empty": "Поле обязательно для заполнения",
    }),
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


export default function Register(props) {
  const methods = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = ({name, email, password}) => {
    props.handleRegister(name, email, password);
  };

  return (
    <div className='register'>
      <FormProvider {...methods} >
        <form className='register__content' name='register-form' onSubmit={methods.handleSubmit(onSubmit)}>
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
          <FormButton className='register__button' title='Зарегистрироваться' />
          <FormHelper
            className='register__helper'
            title='Уже зарегистрированы?'
            buttonTitle='Войти'
            linkTo='signin'
          />
        </form>
      </FormProvider>
    </div>
  )
}
