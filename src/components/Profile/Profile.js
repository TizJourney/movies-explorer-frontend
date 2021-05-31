import './Profile.css';

import Header from '../Header/Header';

import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import classnames from 'classnames';

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
  const [isDisabled, setIsDisabled] = React.useState(true);

  const { register, handleSubmit, setValue, getValues, formState: {errors} } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('name', currentUser.name);
    setValue('email', currentUser.email);
  }, [currentUser, setValue]);

  function onSubmit(values) {
    props.handleEditProfile(values);
  };

  function onChange(values) {
    const formValues = getValues();
    setIsDisabled(Object.keys(errors).length > 0 || (currentUser.name === formValues.name && currentUser.email === formValues.email));
  };

  const isDisabledClass = isDisabled ? 'profile__button_disabled' : null;


  return (
    <div className='profile'>
      <div className='profile__content'>
        <Header className='profile__header' />
        <form name='profileForm' className='profile__body' onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
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
          <button type="submit" className={classnames('profile__button', isDisabledClass)} disabled={isDisabled}>Редактировать</button>
          <button className='profile__button profile__button_logout' onClick={() => {props.handleLogout()}}>Выйти из аккаунта</button>
        </form>
      </div>
    </div >
  )
}
