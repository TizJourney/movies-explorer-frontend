
import './AccountButton.css';

import classnames from 'classnames';
import account_logo from '../../images/account-logo.svg';

export default function AccountButton(props) {
  return (
    <div className={classnames(props.className, 'account-logo')}>
      <p className='account-logo__text'>Аккаунт</p>
      <img className='account-logo__logo' src={account_logo} alt='Изображение лого аккаунта' />
    </div>
  )
}
