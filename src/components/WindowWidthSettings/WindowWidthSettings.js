import { useState, useEffect } from 'react';
import {
  MORE_BUTTON_RESOLUTION_SETTINGS,
  MORE_BUTTON_TOP_WIDTH_THRESHOLD,
  MORE_BUTTON_BOTTOM_WIDTH_THRESHOLD,
} from '../../utils/utils';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function WindowWidthSettings() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function handleResizeDeffered() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    let doit;
    function handleResize() {
      clearTimeout(doit);
      doit = setTimeout(handleResizeDeffered, 100);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);

  if ( windowDimensions.width >= MORE_BUTTON_TOP_WIDTH_THRESHOLD) {
    return MORE_BUTTON_RESOLUTION_SETTINGS.big
  }
  if ( windowDimensions.width <= MORE_BUTTON_BOTTOM_WIDTH_THRESHOLD) {
    return MORE_BUTTON_RESOLUTION_SETTINGS.small
  }
  return MORE_BUTTON_RESOLUTION_SETTINGS.medium
}
