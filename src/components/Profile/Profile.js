import './Profile.css';

import Header from '../Header/Header';

import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required().min(3)
    .messages({
      "string.min": "Пароль должен быть минимум длины 3",
      "string.empty": "Поле обязательно для заполнения",
    }),
  email: Joi.string().email({ tlds: { allow: false } }).required()
    .messages({
      "string.email": "Должен быть валидный email",
      "string.empty": "Поле обязательно для заполнения",
    }),
});


export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: joiResolver(schema),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser, setValue]);

  function onSubmit(values) {
    props.handleEditProfile(values);
  };

  return (
    <div className='profile'>
      <div className='profile__content'>
        <Header className='profile__header' />
        <form name='profileForm' className='profile__body' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='profile__title'>Привет, {currentUser.name}!  </h2>

          <div className='profile__input-container' >
            <p className='profile__input-title'>Имя</p>
            <input
              type='text'
              className='profile__input'
              name='name'
              {...register('name')}
            />
            {errors.name && <p className='profile__input-error'>{errors.name.message}</p>}
          </div>


          <div className='profile__input-container' >
            <p className='profile__input-title'>E-mail</p>
            <input
              type='email'
              className='profile__input'
              name='email'
              {...register('email')}
            />
            {errors.email && <p className='profile__input-error'>{errors.email.message}</p>}
          </div>
          <button type="submit" className='profile__button'>Редактировать</button>
          <button className='profile__button profile__button_logout' onClick={() => {props.handleLogout()}}>Выйти из аккаунта</button>
        </form>
      </div>
    </div >
  )
}
