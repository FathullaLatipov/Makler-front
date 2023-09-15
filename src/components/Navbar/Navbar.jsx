import "./Navbar.scss";
import logo from "../../assets/img/logo_site2.png";
import spirite from "../../assets/img/symbol/sprite.svg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ContextApp from "../../context/context";
import {useTranslation} from "react-i18next";

const Navbar = () => {
  const router = useLocation();
  const [showNav, setShowNav] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { userData, loginModalFunc } = useContext(ContextApp);
  const userId = localStorage.getItem("userId");
  const access = localStorage.getItem("access");
  const { t, i18n } = useTranslation();
  
  
  const keys = {
    product: t("navbar.product"),
    master: t("navbar.master"),
    industria: t("navbar.industria"),
    mebel: t("navbar.furniture"),
    cabinet: t("navbar.cabinet"),
    "save-products": t("navbar.favorites"),
    aboutus: t("navbar.aboutMe")
  };

  
  useEffect(() => {
    if (access) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [access]);

  useEffect(() => {
    setShowNav(false);
  }, [router]);


  return (
    <header className="header">
      <div className="container">
        <div className="header-body">
          <div className="header__left">
            <Link to="/">
              <img src={logo} alt="Makler" />
            </Link>
            <ul className="breadcrumbs">
              <li>
                {" "}
                <a href="/">
                  <svg className="svg-sprite-icon icon-fi_arrow-left fill-n w-16 d-none">
                    <use href={`${spirite}#fi_arrow-left`}></use>
                  </svg>
                  <svg className="svg-sprite-icon icon-fi_home fill-n w-16">
                    <use href={`${spirite}#fi_home`}></use>
                  </svg>
                </a>
              </li>
              <li>
                <Link to={"/"}>{t("navbar.main")}</Link>
              </li>
              {router.pathname
                .split("/")
                .filter((item) => item !== "")
                .map((item, i) => (
                  <li key={i} className="bread-link">
                    <Link
                      to={isNaN(item) ? item : null}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {keys[item] || item}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="header-nav">
            {/*<button*/}
            {/*  onClick={() => setShowNav((prev) => !prev)}*/}
            {/*  className={`hamburger hamburger--collapse ${*/}
            {/*    showNav ? "is-active" : ""*/}
            {/*  }`}*/}
            {/*  type="button"*/}
            {/*>*/}
            {/*  <span className="hamburger-box">*/}
            {/*    <span className="hamburger-inner"></span>*/}
            {/*  </span>*/}
            {/*</button>*/}
            <ul className={`header-nav-list ${showNav ? "active" : ""}`}>
              <li>
                <a href="#">
                  <svg className="svg-sprite-icon icon-fi_globe w-16">
                    <use href={`${spirite}#fi_globe`}></use>
                  </svg>
                  <span style={{fontSize: "15px"}}>
                    <span
                        style={{ color: i18n.resolvedLanguage !== "ru" ? 'rgba(11, 11, 11, 0.2)' : null}}
                        onClick={() => {
                          i18n.changeLanguage("ru")
                          window.location.reload();
                        }}
                    >Ру / </span>
                    <span
                        style={{ color: i18n.resolvedLanguage !== "uz" ? 'rgba(11, 11, 11, 0.2)' : null}}
                        onClick={() => {
                          i18n.changeLanguage("uz")
                          window.location.reload();
                        }}
                    > Uz</span>
                  </span>
                </a>
              </li>
              <li>
                {" "}
                <Link to="/save-products">
                  <svg className="svg-sprite-icon icon-fi_heart w-16">
                    <use href={`${spirite}#fi_heart`}></use>
                  </svg>
                  <span>{t("navbar.favourite")}</span>
                </Link>
              </li>
              <li>
                {isLogin ? (
                  <Link to={`/cabinet/${userId}`}>
                    <svg className="svg-sprite-icon icon-fi_log-in w-16">
                      <use href={`${spirite}#fi_log-in`}></use>
                    </svg>
                    <span>{t("navbar.profile")} </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setShowNav((prev) => !prev);
                      loginModalFunc(true);
                    }}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "600",
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                    }}
                  >
                    <svg className="svg-sprite-icon icon-fi_log-in w-16">
                      <use href={`${spirite}#fi_log-in`}></use>
                    </svg>
                    {t("navbar.sign")}{" "}
                  </button>
                )}
              </li>
              <li>
                {isLogin ? (
                  <Link className="btn btn-orange-text" to="/create">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.333v9.334M3.333 8h9.333"
                        stroke="rgba(238,125,62,255)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("navbar.placeanadd")}</span>
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
