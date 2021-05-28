import './Navigation.css';

import React from 'react';

export default function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen && "navigation_opened"}`}>
      <p>Hellow, kitties!</p>
    </div>
  )
}
