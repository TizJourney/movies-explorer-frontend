import classnames from 'classnames';

import './Preloader.css';

export default function Preloader(props) {
  return (
    <div className={classnames(props.className, 'preloader')}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
}
