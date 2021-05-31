import './SitePage.css';

import classnames from 'classnames';
import React from 'react';
import InfoPopup from '../InfoPopup/InfoPopup';

export default function SitePage({ infoStatus, children, ...props }) {

  return (
    <div className={classnames(props.className)} >
      {React.cloneElement(children, { ...props })}
      {
        infoStatus && infoStatus.active &&
        <InfoPopup
          title={infoStatus.title}
          message={infoStatus.message}
          style={infoStatus.style}
        />
      }
    </div>
  )
}

