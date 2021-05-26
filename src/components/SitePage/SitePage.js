import classnames from 'classnames';

import './SitePage.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SitePage(props) {
  return (
    <div className={classnames('page', props.className)}>
      <div className="page__content">
        <Header className='page__item'/>
        {props.children}
        <Footer className='page__item' />
      </div>
    </div>
  )
}
