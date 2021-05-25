import './AboutProject.css';

import React from 'react';

export default function About(props) {
  return (
    <div className="about">
      <ul className="about__info about-info">
        <li className="about-info__item about-info__item_title">Дипломный проект включал 5 этапов</li>
        <li className="about-info__item about-info__item_title">На выполнение диплома ушло 5 недель</li>
        <li className="about-info__item">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
        <li className="about-info__item">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
      </ul>

      <ul className="about__timeline about-timeline">
        <li className="about-timeline__item about-timeline__item_highlight">1 неделя</li>
        <li className="about-timeline__item">4 недели</li>
        <li className="about-timeline__title">Front-end</li>
        <li className="about-timeline__title">Back-end</li>
      </ul>
    </div>
  )
}
