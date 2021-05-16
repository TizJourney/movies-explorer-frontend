import './Main.css';

import React from 'react';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import About from '../About/About';
import Tech from '../Tech/Tech';
import Student from '../Student/Student';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function MainPage(props) {
  const mainPageClassName = `main-content__page ${props.darkTheme && 'main-content__page_dark'} ${props.promoPage && 'main-content__page_promo'}`;

  return (
    <div className={mainPageClassName}>
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
      <MainPage darkTheme={true} promoPage={true} >
        <Header darkTheme={true} />
        <Promo />
        <NavTab />
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
