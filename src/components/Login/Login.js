import './Login.css';

import { FormTitle, FormInput, FormButton, FormHelper} from '../Form/Form.js';

export default function Login(props) {
  return (
    <div className='login'>
      <div className='login__content'>
        <FormTitle className='login__header' title='Рады видеть!' />
        <FormInput className='login__input' title='E-mail' />
        <FormInput className='login__input' title='Пароль' />
        <FormButton className='login__button' title='Войти' handleSubmit={props.handleSubmit} />
        <FormHelper
          className='login__helper'
          title='Ещё не зарегистрированы?'
          buttonTitle='Регистрация'
          linkTo='signup'
        />
      </div>
    </div>
  )
}
