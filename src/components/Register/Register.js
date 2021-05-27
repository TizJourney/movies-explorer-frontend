import './Register.css';

import { FormTitle, FormInput, FormButton, FormHelper} from '../Form/Form.js';

export default function Register(props) {
  return (
    <div className='register'>
      <div className='register__content'>
        <FormTitle className='register__header' title='Добро пожаловать!' />
        <FormInput className='register__input' title='Имя' />
        <FormInput className='register__input' title='E-mail' />
        <FormInput className='register__input' title='Пароль' />
        <FormButton className='register__button' title='Зарегистрироваться' handleSubmit={props.handleSubmit} />
        <FormHelper
          className='register__helper'
          title='Уже зарегистрированы?'
          buttonTitle='Войти'
          linkTo='signin'
        />
      </div>
    </div>
  )
}
