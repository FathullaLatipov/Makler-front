import "./Footer.scss";
import makler from "../../assets/img/svg/logo-white.svg";
import logo from "../../assets/img/logo_site2.png";
import payme from "../../assets/img/svg/payme.svg";
import click from "../../assets/img/svg/click.svg";
import upay from "../../assets/img/svg/upay.svg";
import spirite from "../../assets/img/symbol/sprite.svg";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";
import useMedia from "../../hooks/useMedia";

const Footer = () => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 768px)');

  return (
    <footer
        className="footer"
        style={{
          marginBottom: isMobile ? "80px" : '0px'
        }}
    >
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
                <Link to="/aboutus">
                  {" "}
                  <a href="#">{t("footer.advertisers")}</a>
                </Link>
              </li>
              <li>
                <Link to="/aboutus">
                  {" "}
                  <a href="#">{t("footer.postingInstructions")}</a>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/aboutus">
                  {" "}
                  <a href="#">{t("footer.support")} </a>
                </Link>
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
              Makleruz.uz - {t("footer.footerText")}
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
                <p>Copyright {new Date().getFullYear()}</p>
              </li>
              <li>
                <p>
                  {t("footer.allRightReserved")}
                </p>
              </li>
            </ul>
            <ul className="social-links">
              <li>
                <a href="https://instagram.com/makleruz.uz?igshid=MzRlODBiNWFlZA==" target="_blank">
                  <svg className="svg-sprite-icon icon-inst w-12">
                    <use href={`${spirite}#inst`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://t.me/makleruzuz">
                  <svg className="svg-sprite-icon icon-telegram w-12">
                    <use href={`${spirite}#telegram`}></use>
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
