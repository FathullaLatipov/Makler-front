import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import "../PrivacyPolicy/PrivacyPolicy.scss";

const TermsCondition = () => {
    const { t } = useTranslation();
    
    return (
        <div className="aboutus">
            <div className="container">
                <div className="aboutus__inner">
                    <div className="aboutus__content">
                        <h1 className="aboutus__title">
                            {t("condition.title")}
                        </h1>
                        <p className="aboutus__shortly"></p>
                        <p className="aboutus__text">{parse(t("condition.text"))}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsCondition;