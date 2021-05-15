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

function MainTitle(props) {
  return (
    <h2 className="main-content__title">{props.title}</h2>
  )
}

export default function Main(props) {
  return (
    <div className="main-content">
      <MainPage>
        <Header />
        <Hero />
      </MainPage>

      <MainPage>
        <MainTitle title='О проекте' />
        <About />
      </MainPage>

      <MainPage>
        <MainTitle title='Технологии' />
        <Tech />
      </MainPage>

      <MainPage>
        <MainTitle title='Студент' />
        <Student />
      </MainPage>

      <Footer />
    </div>
  )
}
