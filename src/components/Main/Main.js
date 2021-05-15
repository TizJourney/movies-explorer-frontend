import './Main.css';

import React from 'react';

import Hero from '../Hero/Hero';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function MainPage(props) {
  return (
    <div className="main-content__page">
      {props.children}
    </div>
  )
}

export default function Main(props) {
  return (
    <div className="main-content">
      <MainPage>
        <Header/>
        <Hero/>
      </MainPage>

      <MainPage>
        <About/>
      </MainPage>

      <MainPage>
        <Tech/>
      </MainPage>

      <MainPage>
        <Student />
      </MainPage>

      <Footer/>
    </div>
  )
}
