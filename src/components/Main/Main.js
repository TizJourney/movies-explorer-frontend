
import classnames from 'classnames';

import './Main.css';

import React from 'react';



import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function MainPage(props) {
  return (
    <div  id={props.id} className={classnames('main-content__page', props.className)}>
      {props.children}
    </div>
  )
}

function MainTitle(props) {
  return (
    <h2 className={classnames('main-content__title', props.className, props.theme)}>{props.title}</h2>
  )
}

export default function Main(props) {
  return (
    <div className="main-content">
      <MainPage className='main-content__page_promo'>
        <Header className='main-conetent__header' />
        <Promo className='main-conetent__promo'/>
      </MainPage>

      <MainPage id='project'>
        <MainTitle  title='О проекте' />
        <AboutProject className='main-content__about-project' />
      </MainPage>

      <MainPage id='tech' theme='main-content__page_grey'>
        <MainTitle title='Технологии' className='main-content__title_tech' />
        <Tech className='main-content__tech' />
      </MainPage>

      <MainPage id='me' >
        <MainTitle title='Студент' />
        <AboutMe className='main-content__student-content' />
        <Portfolio className='main-content__portfolio' />
      </MainPage>

      <Footer className='main-content__page' />
    </div>
  )
}
