import React from 'react';
import simple from "../../assets/img/MaklerUz - 002.png";
import adv from "../../assets/img/ads.png";
import "./AboutUs.scss";
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

const AboutUs = () => {
    const { t } = useTranslation();
    
    return (
        <div className="aboutus">
            <div className="container">
                <div className="aboutus__inner">
                    <div className="aboutus__content">
                        <h1 className="aboutus__title">
                            {t("aboutUs.title")}
                        </h1>
                        {/* <p className="aboutus__shortly">Если есть краткое описание темы, мы дадим его так!</p> */}
                        <p className="aboutus__shortly"></p>
                        {/* <p className="aboutus__text">Например, внизу сайта есть меню для рекламодателей, поэтому, когда пользователь нажмет на него, откроется информационная страница для рекламодателей, и она будет выглядеть вот так!</p> */}
                        <p className="aboutus__text">{parse(t("aboutUs.text"))}</p>
                        <div className="aboutus__img">
                            <img style={{ width: "100%" }} src={simple} alt=""/>
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