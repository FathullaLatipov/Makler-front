import React from "react";
import { useState, useRef, useEffect } from "react";
import sprite from "../../assets/img/symbol/sprite.svg";
import "../../components/EditPage/EditPage.css";
import {
  GeolocationControl,
  Placemark,
  YMaps,
  Map,
} from "@pbe/react-yandex-maps";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { LoadingPost } from "../../components";
import { useContext } from "react";
import ContextApp from "../../context/context";
import $host from "../../http";
import {getPathImage} from "../../helpers/getPathImage";
import { useTranslation } from "react-i18next";

const initialState = {
  title: "",
  center: [40.783388, 72.350663],
  zoom: 12,
};

export default function CreateMebel() {
  const { navigateToProfile } = useContext(ContextApp);
  const [loading, setLoading] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [categoryText, setCategoryText] = useState("");
  const [navActive, setNavActive] = useState(false);
  const [navActive2, setNavActive2] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [img, setImg] = useState([]);
  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const { t } = useTranslation();


  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
    width: 600,
    height: 400,
  };

  const geolocationOptions = {
    defaultOptions: { maxWidth: 128 },
    defaultData: { content: "Determine" },
  };

  const fetchCategories = async () => {
    try {
      const res = await $host.get(`/mebel/api/v1/mebel-categories/`);
      setCategoryData(res.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item")?.value;
          mapConstructor?.geocode(selectedName).then((result) => {
            const newCoords = result?.geoObjects
              ?.get(0)
              ?.geometry?.getCoordinates();
            setState((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor?.geocode(newCoords).then((res) => {
      const nearest = res?.geoObjects?.get(0);
      const foundAddress = nearest?.properties.get("text");
      const [centerX, centerY] = nearest?.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState?.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };


  const imgHandleChange = (e) => {
    const { files } = e.target;
    setImg([...files]);
  };

  const { form, changeHandler } = useForm({
    title: "",
    descriptions: "",
    short_descriptions: "",
    price_type: 1,
    category: "",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price_type", Number(form.price_type));
    formData.append("long_descriptions", form.descriptions);
    formData.append("short_descriptions", form.short_descriptions);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("phone_number", form.phoneNumber);
    formData.append("web_address_title", searchRef.current?.value);
    formData.append("web_address_latitude", state?.center[0]);
    formData.append("web_address_longtitude", state?.center[1]);
    for (const im of img) {
      formData.append("uploaded_images", im);
    }

    try {
      await $host.post("https://api.makleruz.uz/mebel/api/v1/mebels/create/", formData);
      toast.success("Успешно!");
      navigateToProfile();
    } catch (e) {
      console.log(e);
      toast.error("Ошибка!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <LoadingPost />}
      <div className="create-product-s">
        <div className="create-product edit-page">
          <form className="create-product__left" onSubmit={handleSubmit}>
            <h1 className="edit__card__title">
              Создайте и продавайте мебели
            </h1>
            <p className="edit__card__text">
              {t("editPage.announcementWillBeAvailable")}{" "}
              <a target={"_blank"} className="text__link" href="">
                Makler.uz
              </a>{" "}
             {t("editPage.andInOurMobileApp")}
            </p>

            <div className="editpage__input">
              <div
                className="form__input"

              >
                <label htmlFor="">
                  <span>Мебельные названия</span>
                  <input
                    name={"title"}
                    onChange={changeHandler}
                    id="name"
                    type={"text"}
                    placeholder=""
                  />
                </label>

                <label htmlFor="">
                  <span>{t("editPage.phoneNumberAndLogin")}</span>
                  <input
                    name={"phoneNumber"}
                    onChange={changeHandler}
                    type={"number"}
                    placeholder="+998 90 123-45-67"
                  />
                </label>
              </div>
              <label htmlFor="">
                <span className="text__area">Краткое описание</span>
                <textarea
                  style={{
                    width: "100%",
                  }}
                  className="textarea"
                  name="descriptions"
                  onChange={changeHandler}
                  id=""
                  placeholder={t("editPage.empty")}
                ></textarea>
              </label>
              <label htmlFor="">
                <span className="text__area">{t("editPage.shortDescriptionAboutMe")}</span>
                <textarea
                  style={{
                    width: "100%",
                  }}
                  className="textarea"
                  name="short_descriptions"
                  onChange={changeHandler}
                  id=""
                  placeholder={t("editPage.empty")}
                ></textarea>
              </label>
              <div
                style={{
                  marginTop: "2rem",
                }}
              >
                <h5>{t("filter.brand")}</h5>
                <div
                  className="form-price"
                  style={{
                    display: "block",
                  }}
                >
                  <div className="form-price-choose">
                    <button
                      className="choose-currency"
                      type="button"
                      id="select-currency"
                      onClick={() => setNavActive2((prev) => !prev)}
                    >
                      <span>{categoryText ? categoryText : "------"}</span>
                      <svg className="svg-sprite-icon icon-fi_chevron-down fill-n w-12">
                        <use href={`${sprite}#fi_chevron-down`}></use>
                      </svg>
                    </button>
                    <div
                      className={`nav-body-choose ${navActive2 && "active"}`}
                      style={{
                        width: "100%",
                        left: 0,
                        maxHeight: "10rem",
                        overflow: "auto",
                      }}
                    >
                      <ul
                        style={{
                          width: "100%",
                        }}
                      >
                        {categoryData?.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              width: "100%",
                            }}
                          >
                            <label
                              style={{
                                width: "100%",
                              }}
                              htmlFor={`category${item.id}`}
                              className={`labelcha ${
                                item.id === Number(form.category)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </label>
                            <input
                              type="text"
                              id={`category${item.id}`}
                              name="category"
                              onClick={(e) => {
                                changeHandler(e);
                                setNavActive2(false);
                                setCategoryText(item.title);
                              }}
                              value={item.id}
                              readOnly
                              style={{
                                display: "none",
                              }}
                            />
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="form-price">
                  <input
                    type="number"
                    placeholder="Стоимость"
                    required
                    name="price"
                    onChange={changeHandler}
                  />
                  <div className="form-price-choose">
                    <button
                      className="choose-currency"
                      type="button"
                      id="select-currency"
                      onClick={() => setNavActive((prev) => !prev)}
                    >
                      <span>{priceText}</span>
                      <svg className="svg-sprite-icon icon-fi_chevron-down fill-n w-12">
                        <use href={`${sprite}#fi_chevron-down`}></use>
                      </svg>
                    </button>
                    <div className={`nav-body-choose ${navActive && "active"}`}>
                      <ul>
                        {[
                          { id: 1, text: "y.e" },
                          { id: 2, text: "som" },
                        ].map((item) => (
                          <div key={item.id}>
                            <label
                              htmlFor={item.text}
                              className={`labelcha ${
                                item.id === Number(form.price_type)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {item.text}
                            </label>
                            <input
                              key={item.id}
                              type="text"
                              id={item.text}
                              name="price_type"
                              onClick={(e) => {
                                changeHandler(e);
                                setNavActive(false);
                                setPriceText(item.text);
                              }}
                              value={item.id}
                              readOnly
                              style={{
                                display: "none",
                              }}
                            />
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h5>{t("editPage.location")}</h5>
            <div
              className="map"
              style={{
                position: "relative",
              }}
            >
              <div className="map-info">
                <h5>Где находится?</h5>
                <div className="map-address">
                  <input
                    ref={searchRef}
                    placeholder="г.Ташкент, ул.Охангарон 65 А 1"
                    id="suggest"
                    name="address_title"
                  />
                </div>
              </div>
              <p className="error-par d-none">Такой геолокации не существует</p>
              <div
                id="map"
                className="mapRoot"
                style={{
                  position: "relative",
                }}
              >
                <YMaps
                  query={{
                    apikey: "29294198-6cdc-4996-a870-01e89b830f3e",
                    lang: "en_RU",
                  }}
                >
                  <Map
                    {...mapOptions}
                    state={{
                      center: state?.center,
                      zoom: 12,
                    }}
                    onLoad={setMapConstructor}
                    onBoundsChange={handleBoundsChange}
                    instanceRef={mapRef}
                  >
                    <GeolocationControl {...geolocationOptions} />
                    <Placemark geometry={state.center} />
                  </Map>
                </YMaps>
              </div>
            </div>

            <div
              style={{
                marginTop: "2rem",
              }}
            >
              <h5>{t("editPage.objectImages")}</h5>
              <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>{t("editPage.supportsImgExt")}</p>
                  </div>
                  <input
                    type="file"
                    name="machineImg"
                    onChange={(e) => {
                      imgHandleChange(e);
                    }}
                    id="upload-images"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                  <label htmlFor="upload-images">открыть</label>
                </div>
                <ul className="image-list" id="gallery">
                  {img.map((im, i) => (
                      <li key={i}>
                        <img src={getPathImage(im)} alt="house" />
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="checkbox">
              <input
                className="checkbox__input"
                type={"checkbox"}
                name=""
                id=""
              />
              <span className="checkbox__text">
                {t("editPage.agreeWithTerms")}
              </span>
            </div>

            <div className="register">
              <button
                className="register__btn"
                type="submit"
                style={{
                  cursor: "pointer",
                }}
              >
                Зарегистрироватся
              </button>
            </div>
          </form>
          <div className="create-product__right">
            <div className="edit__card">
              <div className="edit__card__content">
                <h2 className="right__card__title">
                  Краткое описание о нашем сервисе
                </h2>
                <p className="edit__card__text">{t("editPage.registerAsMaster")}</p>
                <p>
                  Как только вы зарегистрируетесь в качестве мастера, вы сможете
                  получать заказы по направлениям, введенным через наш портал!
                </p>
                <div className="blockquote__card">
                  <em className="blockquote__text">
                    Напоминаем, что мы не несем ответственности за сбор платы за
                    услуги через этот портал!
                  </em>
                </div>
                <p>
                  При регистрации вы вводите свой номер телефона в качестве
                  логина и придумываете себе пароль. Нажав кнопку входа, вы
                  введете свой номер телефона и пароль для доступа к
                  существующему профилю.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
