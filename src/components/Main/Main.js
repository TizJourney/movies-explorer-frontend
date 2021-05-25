
import classnames from 'classnames';

import './Main.css';

import React from 'react';



import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import AboutMe from '../AboutMe/AboutMe';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function MainPage(props) {
  return (
    <div className={classnames('main-content__page', props.className, props.theme)}>
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
      <MainPage theme='main-content__page_dark' className='main-content__page_promo'>
        <Header darkTheme={true} />
        <Promo />
        <NavTab />
      </MainPage>

      <MainPage>
        <MainTitle title='О проекте' />
        <AboutProject />
      </MainPage>

      <MainPage theme='main-content__page_grey'>
        <MainTitle title='Технологии' />
        <Tech />
      </MainPage>

      <MainPage>
        <MainTitle title='Студент' />
        <AboutMe className='main-content__student-content'/>
      </MainPage>

      <Footer />
    </div>
  )
}
