import './About.css';

import React from 'react';

export default function About(props) {
  return (
    <div className="about">
      <ul className="about-info">
        <li className="about-info__item about-info__item_title">Дипломный проект включал 5 этапов</li>
        <li className="about-info__item about-info__item_title">На выполнение диплома ушло 5 недель</li>
        <li className="about-info__item">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
        <li className="about-info__item">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
      </ul>
    </div>
  )
}
