import './Main.css';

import React from 'react';

import SitePage from '../SitePage/SitePage';

import Hero from '../Hero/Hero';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';

export default function Main(props) {
  return (
    <SitePage>
      <Hero/>
      <About/>
      <Tech/>
      <Student/>
    </SitePage>
  )
}
