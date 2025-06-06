import { UserContents } from '../../components';
import avatar_image from '../../assets/img/avatar_change.png';
import spirite from '../../assets/img/symbol/sprite.svg';
import { userCabinetNavigator } from './userAnnounce';
import React, { useContext, useEffect, useState } from 'react';
import UserSettings from './UserSettings';
import { useParams, useNavigate } from 'react-router-dom';
import ContextApp from '../../context/context';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import $host, { WEB_URL } from '../../http';
import { useCookies } from 'react-cookie';
import './UserCabinet.scss';
import { toast } from 'react-toastify';

const UserCabinet = () => {
  const [holdId, setHoldId] = useState(1);
  const router = useNavigate();
  const { userData, refferals } = useContext(ContextApp);
  const [mounted, setMounted] = useState(false);

  const [houses, setHouses] = useState(null);
  const [stores, setStores] = useState(null);
  const [mebels, setMebels] = useState([]);
  const [maklers, setMaklers] = useState([]);

  const [filtered, setFiltered] = useState();
  const [filteredMaklers, setFilteredMaklers] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [filteredMebels, setFilteredMebels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [cookies, setCookies, removeCookie] = useCookies();

  const refferLink = `https://makleruz.uz/login?ref=${userData.referral_code}`;

  const getData = (setData, url) => {
    $host
      .get(`/users/api/v1/${url}/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData(setUserProducts, 'user-products');
  }, [mounted]);

  useEffect(() => {
    setStores(userProducts?.stores);
    setHouses(userProducts?.houses);
    setMaklers(userProducts?.maklers);
    setMebels(userProducts?.mebels);
  }, [userProducts, mounted]);

  useEffect(() => {
    window.document.title = t('navbar.profile');
  }, []);

  console.log(refferals);

  const draftArr = [
    {
      content: 'house',
      arr: houses,
      filteredArr: filtered,
    },
    {
      content: 'master',
      arr: maklers,
      filteredArr: filteredMaklers,
    },
    {
      content: 'store',
      arr: stores,
      filteredArr: filteredStores,
    },
    {
      content: 'mebel',
      arr: mebels,
      filteredArr: filteredMebels,
    },
  ];

  console.log(houses);

  const filterFunc = (setFilter, arr) => {
    const filtered = arr?.filter(item => {
      return item.product_status !== 3 && item.draft !== true;
    });
    setFilter(filtered);
  };

  useEffect(() => {
    filterFunc(setFiltered, houses);
  }, [houses]);
  useEffect(() => {
    filterFunc(setFilteredMaklers, maklers);
  }, [maklers]);
  useEffect(() => {
    filterFunc(setFilteredStores, stores);
  }, [stores]);
  useEffect(() => {
    filterFunc(setFilteredMebels, mebels);
  }, [mebels]);

  const handleLogOut = () => {
    localStorage.clear();
    router('/');
    window.location.reload();
    removeCookie('refreshToken');
  };

  const getRefferLink = () => {
    navigator.clipboard.writeText(refferLink);
    toast.success(t('cabinet.linkCopied'));
  };

  return (
    <section className="cabinet-s">
      <div className="container">
        <div className="cabinet" id="cabinet">
          <div
            className="cabinet-nav reffer"
            style={{ borderRadius: '5px', marginBottom: '1.375rem' }}
          >
            <p>{t('cabinet.chanceToWin')}</p>

            <div className="reffer__points">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="black"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="black"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('cabinet.myPoints')}: {userData.score}
            </div>

            <div className="form-input">
              <label>{t('cabinet.refferalLink')}</label>
              <div className="reffer__input" onClick={getRefferLink}>
                <input
                  type="text"
                  placeholder="*******"
                  disabled={true}
                  value={refferLink}
                />
              </div>
            </div>
            <span className="reffer__getlink" onClick={getRefferLink}>
              {t('cabinet.getRefferalLink')}
            </span>
          </div>

          <section
            className={`advert-s ${holdId !== 1 && 'd-none'}`}
            id="product"
          >
            <div className="container-sm">
              <div className="advert">
                <div className="alert-advert">
                  <h5>{t('cabinet.addToTheTop')}</h5>
                  <p>{t('cabinet.addToTheTopText')}</p>
                  <div className="alert-advert-btns">
                    <button className="btn btn-orange-50">
                      {t('cabinet.activateToTop')}
                    </button>
                    <a>{t('cabinet.moreDetails')}</a>
                  </div>
                </div>
                {!loading ? (
                  <ul className="advert-list">
                    {draftArr.every(item => item.filteredArr?.length === 0) && (
                      <span>{t('cabinet.hereEmpty')}</span>
                    )}
                    {draftArr.map((draftArg, i) => (
                      <div key={i}>
                        <span className="all-products-header">
                          {draftArg.content === 'house' &&
                          draftArg.filteredArr?.length
                            ? 'Маклера'
                            : draftArg.content === 'store' &&
                              draftArg.filteredArr?.length
                            ? 'обустройства'
                            : draftArg.content === 'master' &&
                              draftArg.filteredArr?.length
                            ? 'мастера'
                            : draftArg.content === 'mebel' &&
                              draftArg.filteredArr?.length
                            ? 'Мебель'
                            : ''}
                        </span>
                        {draftArg.filteredArr?.map((item, i) => (
                          <UserContents
                            key={i}
                            content={draftArg.content}
                            mounted={setMounted}
                            data={item}
                            draft={false}
                          />
                        ))}
                      </div>
                    ))}
                    {/* {filteredStores?.map((item) => (
                      <UserContents
                        key={item.id}
                        content="store"
                        data={item}
                        mounted={setMounted}
                        draft={false}
                      />
                    ))}
                    {filtered?.map((item, i) => (
                      <UserContents
                        key={i}
                        data={item}
                        content="house"
                        draft={false}
                        mounted={setMounted}
                      />
                    ))}
                    {filteredMaklers?.map((item, i) => (
                      <UserContents
                        key={i}
                        data={item}
                        content="master"
                        draft={false}
                        mounted={setMounted}
                      />
                    ))}
                    {filteredMebels?.map((item, i) => (
                      <UserContents
                        key={i}
                        data={item}
                        content="mebel"
                        draft={false}
                        mounted={setMounted}
                      />
                    ))} */}
                  </ul>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </section>
          <section
            className={`advert-s ${holdId !== 3 && 'd-none'}`}
            id="archive"
          >
            <div className="container-sm">
              <div className="advert">
                <div className="alert-advert">
                  <h5 style={{ fontSize: '1.1rem' }}>
                    {t('cabinet.dateCreated')}
                  </h5>
                  <p>{t('cabinet.managaArchive')}</p>
                </div>
                <ul className="advert-list">
                  {draftArr.map((draftArg, i) => (
                    <div key={i}>
                      {draftArg.arr
                        ?.filter(
                          item =>
                            item.draft === true && item.product_status !== 3
                        )
                        ?.map((item, i) => (
                          <UserContents
                            key={i}
                            content={draftArg.content}
                            mounted={setMounted}
                            data={item}
                            draft={true}
                          />
                        ))}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section
            className={`advert-s ${holdId !== 4 && 'd-none'}`}
            id="draft"
          >
            <div className="container-sm">
              <div className="advert">
                <div className="alert-advert">
                  <h5>{t('cabinet.addToTheTop')}</h5>
                  <p>
                    В этом разделе вы можете создавать и сохранять черновики
                    ваших объявлений и заказов, а также вести работу над ними
                  </p>
                </div>
                <ul className="advert-list">
                  {/* {stores
                    ?.filter((item) => item.product_status === 3)
                    ?.map((item) => (
                      <UserContents
                        key={item.id}
                        content="store"
                        data={item}
                        mounted={setMounted}
                      />
                    ))} */}
                  {draftArr.map((draftArg, i) => (
                    <div key={i}>
                      {/* {<span className="all-products-header">
                        /* {draftArg.content === "house"
                          ? "Маклера"
                          : draftArg.content === "store"
                          ? "обустройства"
                          : draftArg.content === "master"
                          ? "мастера"
                          : "Мебель"}
                        {draftArg.content === "house" &&
                        houses?.filter((item) => item.draft === true).length
                          ? "Маклера"
                          : draftArg.content === "store" &&
                            stores?.filter((item) => item.draft === true).length
                          ? "обустройства"
                          : draftArg.content === "master" &&
                            maklers?.filter((item) => item.draft === true)
                              .length
                          ? "мастера"
                          : draftArg.content === "master" &&
                            mebels?.filter((item) => item.draft === true).length
                          ? "Мебель"
                          : ""}
                      </span> } */}
                      {draftArg.arr
                        ?.filter(item => item?.product_status === 3)
                        ?.map((item, i) => (
                          <UserContents
                            key={i}
                            content={draftArg.content}
                            mounted={setMounted}
                            data={item}
                            draft={false}
                          />
                        ))}
                    </div>
                  ))}
                  {/* {userContents} */}
                  {/* {houses &&
                    houses
                      ?.filter((item) => item.draft === true)
                      ?.map((item) => (
                        <UserContents
                          key={item.id}
                          content="house"
                          mounted={setMounted}
                          data={item}
                          draft={true}
                        />
                      ))}
                  {maklers
                    ?.filter((item) => item.draft === true)
                    ?.map((item, i) => (
                      <UserContents
                        key={i}
                        data={item}
                        content="master"
                        draft={true}
                        mounted={setMounted}
                      />
                    ))}
                  {stores
                    ?.filter((item) => item.draft === true)
                    ?.map((item, i) => (
                      <UserContents
                        key={i}
                        data={item}
                        content="store"
                        draft={true}
                        mounted={setMounted}
                      />
                    ))} */}
                </ul>
              </div>
            </div>
          </section>
          <section
            className={`settings-s ${holdId !== 5 && 'd-none'}`}
            id="settings"
          >
            <UserSettings
              img={userData?.avatar_image}
              name={userData?.first_name}
              number={userData?.phone_number}
              email={userData?.email}
              password={userData?.password}
            />
          </section>
          {/* <section className="chat-s d-none" id="chat">
            <div className="container">
              <div className="chat">
                <div className="chat__left">
                  <ul className="chat-list">
                    <li className="chat-item">
                      {" "}
                      <a href="#">
                        <div className="chat-item-logo">
                          <div className="logo">
                            {" "}
                            <span>HF</span>
                          </div>
                        </div>
                        <div className="chat-item-info">
                          <h5>Habibullo Farxodov</h5>
                          <p>
                            Был в сети: <span>18:32</span>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-item active">
                      <a href="#">
                        <div className="chat-item-logo">
                          <div className="logo">
                            {" "}
                            <picture>
                              <source
                                srcset="img/logo.webp"
                                type="image/webp"
                              />
                              <img src="img/logo.png" alt="logo" />
                            </picture>
                          </div>
                        </div>
                        <div className="chat-item-info">
                          <h5>Makler.uz</h5>
                          <p>
                            Был в сети: <span>18:32</span>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-item">
                      {" "}
                      <a href="#">
                        <div className="chat-item-logo">
                          <div className="logo">
                            {" "}
                            <span>HF</span>
                          </div>
                        </div>
                        <div className="chat-item-info">
                          <h5>Muhammad</h5>
                          <p>
                            Был в сети: <span>18:32</span>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-item">
                      {" "}
                      <a href="#">
                        <div className="chat-item-logo">
                          <div className="logo">
                            {" "}
                            <span>HF</span>
                          </div>
                        </div>
                        <div className="chat-item-info">
                          <h5>id:23904</h5>
                          <p>
                            Был в сети: <span>18:32</span>
                          </p>
                        </div>
                      </a>
                    </li>
                    <li className="chat-item">
                      {" "}
                      <a href="#">
                        <div className="chat-item-logo">
                          <div className="logo">
                            {" "}
                            <span>HF</span>
                          </div>
                        </div>
                        <div className="chat-item-info">
                          <h5>Rixsitillo Hamidov</h5>
                          <p>
                            Был в сети: <span>18:32</span>
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="chat__right">
                  <div className="chat-body">
                    <div className="chat-header">
                      <p>Чат</p>
                      <button className="btn">
                        <svg className="svg-sprite-icon icon-dots">
                          <use href={`${spirite}#dots`}></use>
                        </svg>
                      </button>
                    </div>
                    <ul className="chat-messages">
                      <li>
                        <p>
                          Привет! Уважаемый пользователь, мы хотели бы сообщить
                          вам, что, поскольку вы используете наш сайт, вам
                          предоставляется скидка на рекламу! Ура Ура Ура Ура!
                        </p>
                        <span className="chat-messages-time">09:02</span>
                      </li>
                      <li>
                        <p>
                          Привет! Уважаемый пользователь, мы хотели бы сообщить
                          вам, что, поскольку вы используете наш сайт, вам
                          предоставляется скидка на рекламу! Ура Ура Ура Ура!
                        </p>
                        <span className="chat-messages-time">09:02</span>
                      </li>
                      <li className="your-sms">
                        <span className="your-span">Вы</span>
                        <p>
                          Привет! Уважаемый пользователь, мы хотели бы сообщить
                          вам, что, поскольку вы используете наш сайт, вам
                          предоставляется скидка на рекламу! Ура Ура Ура Ура!
                        </p>
                        <span className="chat-messages-time">09:02</span>
                      </li>
                    </ul>
                    <div className="chat-footer">
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Пишите ваш текст"
                          required=""
                        />
                        <button className="btn" type="submit">
                          <svg className="svg-sprite-icon icon-send fill-n">
                            <use href={`${spirite}#send`}></use>
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <div className="cabinet-nav" style={{ borderRadius: '5px' }}>
            <div className="cabinet-profile">
              <div className="cabinet-profile-logo">
                {' '}
                <picture>
                  <source
                    srcSet={
                      userData.avatar_image
                        ? userData.avatar_image
                        : avatar_image
                    }
                    type="image/webp"
                  />
                  <img
                    src={
                      userData.avatar_image
                        ? userData.avatar_image
                        : avatar_image
                    }
                    alt="Логотип"
                  />
                </picture>
              </div>
              <div className="cabinet-profile-info">
                <h4>
                  {t('cabinet.name')}:{' '}
                  {userData.first_name
                    ? userData.first_name
                    : t('editPage.empty')}
                </h4>
                <p>id: {userData?.id}</p>
                <p>
                  {t('editPage.phoneNumber')}: {userData?.phone_number}
                </p>
              </div>
            </div>
            <ul className="cabinet-nav-list">
              {userCabinetNavigator.map(item => (
                <li
                  className={`${holdId === item.id && 'active'}`}
                  key={item.id}
                  onClick={() => setHoldId(item.id)}
                >
                  <button className="btn btn-orange-light left-icon">
                    <svg className={item.class}>
                      <use href={`${spirite}#${item.icon1}`}></use>
                    </svg>
                    <svg className="svg-sprite-icon icon-fi_book fill-n w-16">
                      <use href={`${spirite}#${item.icon2}`}></use>
                    </svg>
                    <span>{t(item.text)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <a
              className="logout-link left-icon"
              onClick={handleLogOut}
              id="log-out"
              style={{
                cursor: 'pointer',
              }}
            >
              <svg className="svg-sprite-icon icon-fi_log-out-o fill-n w-16">
                <use href={`${spirite}#fi_log-out-o`}></use>
              </svg>
              <svg className="svg-sprite-icon icon-fi_log-out fill-n w-16">
                <use href={`${spirite}#fi_log-out`}></use>
              </svg>
              <span>{t('cabinet.logout')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCabinet;
