import "./UserCabinet.scss";
import avatar from "../../assets/img/avatar-big.png";
import { LoadingPost, UserContents } from "../../components";
import avatar_image from "../../assets/img/avatar_change.png";
import spirite from "../../assets/img/symbol/sprite.svg";
import { userCabinetNavigator } from "./userAnnounce";
import { useContext, useEffect, useState } from "react";
import UserSettings from "./UserSettings";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../requests/requests";
import ContextApp from "../../context/context";
import { useStepContext } from "@mui/material";
import Loading from "../../components/Loading/Loading";
import {useTranslation} from "react-i18next";

const UserCabinet = () => {
  const [holdId, setHoldId] = useState(1);
  const router = useNavigate();
  const { getUserData, userData } = useContext(ContextApp);
  const [stores, setStores] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [houses, setHouses] = useState(null);
  const [mebels, setMebels] = useState([]);
  const [maklers, setMaklers] = useState([]);
  const [filtered, setFiltered] = useState();
  const [filteredMaklers, setFilteredMaklers] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [filteredMebels, setFilteredMebels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOwnData, setUserOwnData] = useState([]);
  const [draft, setDraft] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // console.log(maklers);
  const { id } = useParams();
  // https://api.makleruz.uz//users/api/v1/user-products/2/

  const getData = (setData, url) => {
    let userToken = localStorage.getItem("access");
    axios
      .get(`${baseURL}/users/api/v1/${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((data) => setData(data.data))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getData(getUserData, "user-products");
  }, [mounted]);
  useEffect(() => {
    getData(setUserOwnData, "profile");
  }, []);
  // console.log(userData);

  useEffect(() => {
    setStores(userData?.stores);
    setHouses(userData?.houses);
    setMaklers(userData?.maklers);
    setMebels(userData?.mebels);
  }, [userData, mounted]);

  // console.log(maklers);
  const draftArr = [
    {
      content: "house",
      arr: houses,
      filteredArr: filtered,
    },
    {
      content: "master",
      arr: maklers,
      filteredArr: filteredMaklers,
    },
    {
      content: "store",
      arr: stores,
      filteredArr: filteredStores,
    },
    {
      content: "mebel",
      arr: mebels,
      filteredArr: filteredMebels,
    },
  ];

  const filterFunc = (setFilter, arr) => {
    const filtered = arr?.filter((item) => {
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
    router("/");
    window.location.reload();
  };

  return (
    <section className="cabinet-s">
      <div className="container">
        <div className="cabinet" id="cabinet">
          <section
            className={`advert-s ${holdId !== 1 && "d-none"}`}
            id="product"
          >
            <div className="container-sm">
              <div className="advert">
                <div className="alert-advert">
                  <h5>{t('cabinet.addToTheTop')}</h5>
                  <p>
                    Как только вы зарегистрируетесь в качестве мастера, вы
                    сможете получать заказы по направлениям, введенным через наш
                    портал!
                  </p>
                  <div className="alert-advert-btns">
                    <button className="btn btn-orange-50">
                      Активировать в топ
                    </button>
                    <a>Подробнее </a>
                  </div>
                </div>
                {!loading ? (
                  <ul className="advert-list">
                    {draftArr.every(
                      (item) => item.filteredArr?.length === 0
                    ) && <span>Тут ничего нету</span>}
                    {draftArr.map((draftArg, i) => (
                      <div key={i}>
                        <span className="all-products-header">
                          {draftArg.content === "house" &&
                          draftArg.filteredArr?.length
                            ? "Маклера"
                            : draftArg.content === "store" &&
                              draftArg.filteredArr?.length
                            ? "обустройства"
                            : draftArg.content === "master" &&
                              draftArg.filteredArr?.length
                            ? "мастера"
                            : draftArg.content === "mebel" &&
                              draftArg.filteredArr?.length
                            ? "Мебель"
                            : ""}
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
            className={`advert-s ${holdId !== 3 && "d-none"}`}
            id="archive"
          >
            <div className="container-sm">
              <div className="advert">
                <ul className="advert-list">
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
                        ?.filter(
                          (item) =>
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
            className={`advert-s ${holdId !== 4 && "d-none"}`}
            id="draft"
          >
            <div className="container-sm">
              <div className="advert">
                <div className="alert-advert">
                  <h5>Продвигайте свое объявление в ТОП!</h5>
                  <p>
                    Как только вы зарегистрируетесь в качестве мастера, вы
                    сможете получать заказы по направлениям, введенным через наш
                    портал!
                  </p>
                  <div className="alert-advert-btns">
                    <button className="btn btn-orange-50">
                      Активировать в топ
                    </button>
                    <a href="#">Подробнее </a>
                  </div>
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
                        ?.filter((item) => item?.product_status === 3)
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
            className={`settings-s ${holdId !== 5 && "d-none"}`}
            id="settings"
          >
            <UserSettings
              img={userOwnData?.avatar}
              name={userOwnData?.first_name}
              number={userOwnData?.phone_number}
              email={userOwnData?.email}
              password={userOwnData?.password}
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
          <div className="cabinet-nav">
            <div className="cabinet-profile">
              <div className="cabinet-profile-logo">
                {" "}
                <picture>
                  <source srcSet={avatar_image} type="image/webp" />
                  <img src={avatar_image} alt="Логотип" />
                </picture>
              </div>
              <div className="cabinet-profile-info">
                <h4>Имя: Пустой</h4>
                <p>id: {userOwnData?.id}</p>
                <p>Номер телефона: {userOwnData?.phone_number}</p>
              </div>
            </div>
            <ul className="cabinet-nav-list">
              {userCabinetNavigator.map((item) => (
                <li
                  className={`${holdId === item.id && "active"}`}
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
                    <span>{item.text}</span>
                  </button>
                </li>
              ))}
              <h3 className="balls">Мои балы:0</h3>
            </ul>
            <a
              className="logout-link left-icon"
              onClick={handleLogOut}
              id="log-out"
              style={{
                cursor: "pointer",
              }}
            >
              <svg className="svg-sprite-icon icon-fi_log-out-o fill-n w-16">
                <use href={`${spirite}#fi_log-out-o`}></use>
              </svg>
              <svg className="svg-sprite-icon icon-fi_log-out fill-n w-16">
                <use href={`${spirite}#fi_log-out`}></use>
              </svg>
              <span>Выйти из профиля</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCabinet;
