import "./DownloadApp.scss";
import sprite from "../../assets/img/symbol/sprite.svg";

const DownloadApp = () => {
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
            <h3 className="small-title">Загрузите наше приложение</h3>
            <p>С нашим приложением M-makler это еще удобнее!</p>
          </div>
          <div className="doc">
            <button className="btn btn-gray left-icon btn-long text-left white-icon">
              <svg className="svg-sprite-icon icon-fi_download w-12">
                <use href={`${sprite}#fi_download`}></use>
              </svg>
              <span>Скачать форма док</span>
            </button>
            <h3 className="small-title">Для рекламодателей</h3>
            <p>
              Для упрощения поиска у нас реализована система рекомендаций
              похожих объявлений.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
