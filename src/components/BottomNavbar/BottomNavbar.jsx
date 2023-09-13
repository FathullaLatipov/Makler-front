import React, {useContext} from 'react';

import "./BottomNavbar.scss";
import useMedia from "../../hooks/useMedia";
import {NavLink} from "react-router-dom";
import ContextApp from "../../context/context";
import { useTranslation } from 'react-i18next';

const BottomNavbar = () => {
    const isMobile = useMedia('(max-width: 768px)');
    const userId = localStorage.getItem("userId");
    const { openLoginModal, loginModalFunc } = useContext(ContextApp);
    const { t } = useTranslation();

    if(!isMobile) return null;

    return (
        <div className="bottom-navbar">
            <ul className="bottom-navbar__list">
                <li className="bottom-navbar__item">
                    <NavLink to="/">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.2002 9.5L12.2002 2.5L21.2002 9.5V20.5C21.2002 21.0304 20.9895 21.5391 20.6144 21.9142C20.2393 22.2893 19.7306 22.5 19.2002 22.5H5.2002C4.66976 22.5 4.16105 22.2893 3.78598 21.9142C3.41091 21.5391 3.2002 21.0304 3.2002 20.5V9.5Z" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.2002 22.5V12.5H15.2002V22.5" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{t("navbar.main")}</span>
                    </NavLink>
                </li>
                <li className="bottom-navbar__item">
                    <NavLink to="/save-products">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6006 21.5L12.6006 16.5L5.60059 21.5V5.5C5.60059 4.96957 5.8113 4.46086 6.18637 4.08579C6.56145 3.71071 7.07015 3.5 7.60059 3.5H17.6006C18.131 3.5 18.6397 3.71071 19.0148 4.08579C19.3899 4.46086 19.6006 4.96957 19.6006 5.5V21.5Z" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{t("navbar.favorites")}</span>
                    </NavLink>
                </li>
                <li className="bottom-navbar__item">
                    <NavLink
                        onClick={(e) => {
                            if(!userId) {
                                e.preventDefault();
                                loginModalFunc(true);
                            }
                        }}
                        to="/create"
                    >
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8.5V16.5" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12.5H16" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{t("navbar.create")}</span>
                    </NavLink>
                </li>
                <li className="bottom-navbar__item">
                    <NavLink to="/aboutus">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <span>О нас</span>
                    </NavLink>
                </li>
                <li className="bottom-navbar__item">
                    {userId ? (
                        <NavLink to={`/cabinet/${userId}/`}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.2002 9.5L12.2002 2.5L21.2002 9.5V20.5C21.2002 21.0304 20.9895 21.5391 20.6144 21.9142C20.2393 22.2893 19.7306 22.5 19.2002 22.5H5.2002C4.66976 22.5 4.16105 22.2893 3.78598 21.9142C3.41091 21.5391 3.2002 21.0304 3.2002 20.5V9.5Z" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.2002 22.5V12.5H15.2002V22.5" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{t("navbar.profile")}</span>
                        </NavLink>
                    ) : (
                        <NavLink onClick={(e) => {
                                e.preventDefault();
                                loginModalFunc(true);
                            }}
                                 to={`/cabinet/${userId}/`}
                        >
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.2002 9.5L12.2002 2.5L21.2002 9.5V20.5C21.2002 21.0304 20.9895 21.5391 20.6144 21.9142C20.2393 22.2893 19.7306 22.5 19.2002 22.5H5.2002C4.66976 22.5 4.16105 22.2893 3.78598 21.9142C3.41091 21.5391 3.2002 21.0304 3.2002 20.5V9.5Z" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.2002 22.5V12.5H15.2002V22.5" stroke="#0B0B0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{t("login.signIn")}</span>
                        </NavLink>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default BottomNavbar;