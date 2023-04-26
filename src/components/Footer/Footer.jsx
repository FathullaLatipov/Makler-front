import "./Footer.scss";
import makler from "../../assets/img/svg/logo-white.svg";
import logo from "../../assets/img/logo_site2.png";
import payme from "../../assets/img/svg/payme.svg";
import click from "../../assets/img/svg/click.svg";
import upay from "../../assets/img/svg/upay.svg";
import spirite from "../../assets/img/symbol/sprite.svg";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__top-body">
            <Link to="/">
              {" "}
              <img
                src={logo}
                alt="Makler"
                style={{
                  maxWidth: "13rem",
                }}
              />
            </Link>
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.advertisers")}</a>
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.postingInstructions")}</a>
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.postingInstructions")}</a>
              </li>
            </ul>
            <ul>
              <li>
                {" "}
                <a href="#">{t("footer.help")}</a>
              </li>
              <li>
                {" "}
                <a href="#">{t("footer.support")} </a>
              </li>
              <li>
                {" "}
                <a href="#">+998 90 123-45-67</a>
              </li>
              <li>
                {" "}
                <a href="#">1187</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__center">
        <div className="container">
          <div className="footer__center-body">
            <p>
              'Someday' is a disease that will take your dreams to the grave
              with you. Just do it and correct course along the way.
            </p>
            <ul>
              <li>
                {" "}
                <img src={payme} alt="payme" />
              </li>
              <li>
                {" "}
                <img src={click} alt="click" />
              </li>
              <li>
                {" "}
                <img src={upay} alt="upay" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-body">
            <ul>
              <li>
                <p>Copyright 2022 R</p>
              </li>
              <li>
                <a className="line-link" href="#">
                  {t("footer.termsofuse")}{" "}
                </a>
              </li>
              <li>
                <a className="line-link" href="#">
                  {t("footer.privacypolicy")}
                </a>
              </li>
            </ul>
            <ul className="social-links">
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-fb w-12">
                    <use href={`${spirite}#fb`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-inst w-12">
                    <use href={`${spirite}#inst`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-telegram w-12">
                    <use href={`${spirite}#telegram`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-tw w-12">
                    <use href={`${spirite}#tw`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-in w-12">
                    <use href={`${spirite}#in`}></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
