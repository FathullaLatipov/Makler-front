import React from 'react';
import simple from "../../assets/img/MaklerUz - 002.png";
import adv from "../../assets/img/ads.png";
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    
    return (
        <div className="aboutus">
            <div className="container">
                <div className="aboutus__inner">
                    <div className="aboutus__content">
                        <h1 className="aboutus__title">
                            {t("footer.privacyPolicy")}
                        </h1>
                        <p className="aboutus__shortly"></p>
                        <p className="aboutus__text">{parse(t("privacy.text"))}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;