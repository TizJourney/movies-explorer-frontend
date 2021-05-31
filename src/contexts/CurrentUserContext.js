import React from 'react';

export const CurrentUserContext = React.createContext();

export const USER_PLACEHOLDER_DATA = {
  name: 'Константин',
  email: 'example@mail.ru',
  password: '1234',
  logged: false,
};
