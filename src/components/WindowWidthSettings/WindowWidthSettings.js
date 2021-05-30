import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export default function WindowWidthSettings() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function handleResizeDebounded() {
    setWindowDimensions(getWindowDimensions());
    console.log('resize');
  }

  useEffect(() => {
    let doit;
    function handleResize() {
      clearTimeout(doit);
      doit = setTimeout(handleResizeDebounded, 100);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);

  if ( windowDimensions.width >= 1280) {
    return {default: 12, columns: 3, grow: 3};
  }
  if ( windowDimensions.width <= 420) {
    return {default: 5, columns: 1, grow: 2};
  }
  return {default: 8, columns: 2, grow: 2};
}
