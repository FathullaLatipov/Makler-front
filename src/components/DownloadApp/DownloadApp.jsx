import "./DownloadApp.scss";
import sprite from "../../assets/img/symbol/sprite.svg";
import {useTranslation} from "react-i18next";

const DownloadApp = () => {
  const { t } = useTranslation();

  return (
    <section className="download-app-s bg-white">
      <div className="container">
        <div className="download-app">
          <div className="app">
            <div className="app-btns">
              <button className="btn btn-gray left-icon">
                <svg className="svg-sprite-icon icon-google-play w-16">
                  <use href={`${sprite}#google-play`}></use>
                </svg>
                <span>Google Play</span>
              </button>
              <button className="btn btn-gray left-icon">
                <svg className="svg-sprite-icon icon-apple w-16">
                  <use href={`${sprite}#apple`}></use>
                </svg>
                <span>AppStore</span>
              </button>
            </div>
            <h3 className="small-title">{t("footer.downloadApp")}</h3>
            <p>{t("footer.moreConvinient")}</p>
          </div>
          <div className="doc">
            <button className="btn btn-gray left-icon btn-long text-left white-icon">
              <svg className="svg-sprite-icon icon-fi_download w-12">
                <use href={`${sprite}#fi_download`}></use>
              </svg>
              <span>{t("footer.download")}</span>
            </button>
            <h3 className="small-title">{t("footer.foradvertisers")}</h3>
            <p>
              {t("footer.recommendation")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
