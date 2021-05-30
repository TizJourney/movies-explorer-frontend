import classnames from 'classnames';

import './Preloader.css';

import React, { useState } from 'react';

// export default function Preloader(props) {
//   return (

//     <div className={classnames(props.className, 'preloader')}>
//       <button className='preloader__button'>Ещё</button>
//     </div>

//   )
// }

export default function Preloader(props) {
  const [isActive, setActive] = useState(false);

  const activatePreload = () => {
    setActive(!isActive);
  };

  return (
    <div className={classnames(props.className, 'preloader')}>
      {isActive &&
      <div className="preloader__loader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
      }
    </div>
  )
}
