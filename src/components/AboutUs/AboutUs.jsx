import React from 'react';
import simple from "../../assets/img/simple.png";
import adv from "../../assets/img/ads.png";
import "./AboutUs.scss";

const AboutUs = () => {
    return (
        <div className="aboutus">
            <div className="container">
                <div className="aboutus__inner">
                    <div className="aboutus__content">
                        <h1 className="aboutus__title">
                            Это отдельная страница, где мы используем ее для предоставления информации, выходящей за рамки основной идеи сайта!
                        </h1>
                        <p className="aboutus__shortly">Если есть краткое описание темы, мы дадим его так!</p>
                        <p className="aboutus__text">Например, внизу сайта есть меню для рекламодателей, поэтому, когда пользователь нажмет на него, откроется информационная страница для рекламодателей, и она будет выглядеть вот так!</p>
                        <p className="aboutus__text">Я также должен упомянуть, что данные могут содержать случаи видео и изображений, поэтому я подумал, что было бы хорошо выводить их в точном размере! И я сделал это так!</p>
                        <div className="aboutus__img">
                            <img src={simple} alt=""/>
                        </div>
                    </div>
                    <div className="aboutus__advertise">
                        <img src={adv} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;