import "./CreateProduct.scss";
import sprite from "../../assets/img/symbol/sprite.svg";
import { useContext, useEffect, useState, useTransition } from "react";
import { LoadingPost } from "../../components";
import ContextApp from "../../context/context";
import { useRef } from "react";
import {
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import $host from "../../http";
import {getPathImage} from "../../helpers/getPathImage";
import {useQuery} from "react-query";
import { useTranslation } from "react-i18next";

const CreateProduct = () => {
  const [navActive, setNavActive] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [loading, setLoading] = useState(false);
  const { loginModalFunc, navigateToProfile } = useContext(ContextApp);
  const initialState = {
    title: "",
    center: [40.783388, 72.350663],
    zoom: 12,
  };
  const [state, setState] = useState(initialState);
  const [mapConstructor, setMapConstructor] = useState(null);
  const [aminities, setAminities] = useState([]);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const { t } = useTranslation();

  const { isLoading, error, data: aminitiesData } = useQuery("carousels", () =>
      $host.get("/products/api/v1/web-houses/amenities/").then(({ data }) => data.results)
  );

  const { form, changeHandler } = useForm({
    title: "",
    descriptions: "",
    price: "",
    price_type: 1,
    type: "аденда",
    rental_type: "длительно",
    property_type: "жилая",
    object: "квартира",
    web_address_title: "",
    web_address_latitude: "",
    web_address_longtitude: "",
    pm_general: "",
    pm_residential: "",
    pm_kitchen: "",
    number_of_rooms: "",
    floor: "",
    floor_from: "",
    building_type: "кирпич",
    app_ipoteka: "",
    app_mebel: "",
    app_new_building: "",
    phone_number: "+99895",
    how_sale: [1],
    isBookmarked: false,
    youtube_link: "",
  });

  const postData = async (data) => {
    setLoading(true);
    try {
      await $host.post(`/products/web/api/v1/web-houses/create/`, data);
      toast.success("Успешно");
      navigateToProfile();
    } catch (e) {
      console.log(e);
      toast.error("Ошибка!");
    } finally {
      setLoading(false);
    }
  };
  const handleAmite = (e) => {
    let value = +e.target.value;
    setAminities((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("descriptions", form.descriptions);
    formData.append("price", form.price);
    formData.append("price_type", Number(form.price_type));
    formData.append("type", form.type);
    formData.append("rental_type", form.rental_type);
    formData.append("property_type", form.property_type);
    formData.append("object", form.object);
    formData.append("web_address_title", searchRef.current?.value);
    formData.append("web_address_latitude", state.center[0]);
    formData.append("web_address_longtitude", state.center[1]);
    formData.append("pm_general", form.pm_general);
    formData.append("pm_residential", form.pm_residential);
    formData.append("pm_kitchen", form.pm_kitchen);
    formData.append("number_of_rooms", form.number_of_rooms);
    formData.append("floor", form.floor);
    formData.append("floor_from", form.floor_from);
    formData.append("building_type", form.building_type);
    formData.append("app_ipoteka", Boolean(form.app_ipoteka));
    formData.append("app_mebel", form.app_mebel);
    formData.append("app_new_building", form.app_new_building);
    formData.append("phone_number", form.phone_number);
    formData.append("isBookmarked", form.isBookmarked);
    formData.append("how_sale", form.how_sale);
    formData.append("draft", false);

    if(video) {
      formData.append("youtube_link", video);
    }

    for (const im of img) {
      formData.append("uploaded_images", im);
    }
    for (const aminit of aminities) {
      formData.append("amenities", aminit);
    }

    postData(formData);
  };
  const handeDraftData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("descriptions", form.descriptions);
    formData.append("price", form.price);
    formData.append("price_type", Number(form.price_type));
    formData.append("type", form.type);
    formData.append("rental_type", form.rental_type);
    formData.append("property_type", form.property_type);
    formData.append("object", form.object);
    formData.append("web_address_title", searchRef.current?.value);
    formData.append("web_address_latitude", state?.center[0]);
    formData.append("web_address_longtitude", state?.center[1]);
    formData.append("pm_general", form.pm_general);
    formData.append("pm_residential", form.pm_residential);
    formData.append("pm_kitchen", form.pm_kitchen);
    formData.append("number_of_rooms", form.number_of_rooms);
    formData.append("floor", form.floor);
    formData.append("floor_from", form.floor_from);
    formData.append("building_type", form.building_type);
    formData.append("app_ipoteka", Boolean(form.app_ipoteka));
    formData.append("app_mebel", form.app_mebel);
    formData.append("app_new_building", form.app_new_building);
    formData.append("amenities", form.amenities);
    formData.append("phone_number", form.phone_number);
    formData.append("isBookmarked", form.isBookmarked);
    formData.append("how_sale", form.how_sale);

    if(video) {
      formData.append("youtube_link", video);
    }

    formData.append("draft", true);
    for (const im of img) {
      formData.append("uploaded_images", im);
    }
    for (const aminit of aminities) {
      formData.append("amenities", aminit);
    }

    postData(formData);
  };

  const handleChange = (e) => {
    const { files } = e.target;
    setImg([...files]);
  };

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

  // search popup
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

  // change title
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

  return (
    <>
      <section className="create-product-s">
        {loading && <LoadingPost />}
        <div className="container">
          <div className="create-product">
            <form className="create-product__left" id="create-product">
              <h2>
                Добавить новое <br />
                объявление
              </h2>
              <p className="subtitle">
                {t("editPage.announcementWillBeAvailable")}
                <a href="https://makler.uz">Makler.uz</a> и
                {t("editPage.andInOurMobileApp")}
              </p>
              <h5>Заголовка объявления</h5>
              <div className="form-input">
                <input
                  placeholder={t("editPage.empty")}
                  id="title-product"
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  required
                />
              </div>
              <h5>{t("editPage.shortDescription")}</h5>
              <div className="form-textarea">
                <textarea
                  placeholder={t("editPage.empty")}
                  id="description-product"
                  name="descriptions"
                  onChange={changeHandler}
                  required
                ></textarea>
              </div>
              <h5>Загрузите видео</h5>
              <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>Поддерживает: video/mp4,video/x-m4v,video/*</p>
                  </div>
                  <input
                      type="file"
                      name="uploaded_video"
                      onChange={(e) => setVideo(e.target.files[0])}
                      id="uploaded_video"
                      accept="video/mp4,video/x-m4v,video/*"
                  />
                  <label htmlFor="uploaded_video">открыть</label>
                </div>
                {video && (
                    <h4 style={{ marginTop: "10px" }}>
                      Выбрано: <strong style={{color: "rgba(238,125,62,255)", cursor: "pointer"}}>{ video.name }</strong>
                    </h4>
                )}
              </div>
              <h5>{t("editPage.price")}</h5>
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
                            id={item.text}
                            type="text"
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
              <h5>{t("editPage.selectAdType")}</h5>
              <div className="create-product-btns mb-30">
                <div className="radio-btn-big">
                  <input
                    type="radio"
                    name="type"
                    id="rent"
                    checked={form.type === "аденда"}
                    value="аренда"
                    onChange={changeHandler}
                  />
                  <label htmlFor="rent">{t("editPage.toRent")}</label>
                </div>
                <div className="radio-btn-big">
                  <input
                    type="radio"
                    name="type"
                    id="sale"
                    checked={form.type === "продать"}
                    value="продать"
                    onChange={changeHandler}
                  />
                  <label htmlFor="sale">{t("editPage.propertyForSale")}</label>
                </div>
              </div>
              <h5>{t("editPage.rentalType")}</h5>
              <ul className="switch-list mb-40">
                <li className="switch-btn">
                  <input
                    type="radio"
                    id="long"
                    name="rental_type"
                    onChange={changeHandler}
                    checked={form.rental_type === "длительно"}
                    value="длительно"
                  />
                  <label htmlFor="long">{t("editPage.longTerm")}</label>
                </li>
                <li className="switch-btn">
                  <input
                    type="radio"
                    onChange={changeHandler}
                    id="month"
                    name="rental_type"
                    value="несколько месяцев"
                  />
                  <label htmlFor="month">Несколько месяцев</label>
                </li>
                <li className="switch-btn">
                  <input
                    type="radio"
                    onChange={changeHandler}
                    id="day"
                    name="rental_type"
                    value="посуточно"
                  />
                  <label htmlFor="day">{t("editPage.daily")}</label>
                </li>
              </ul>
              <h5>{t("editPage.propertyType")}</h5>
              <ul className="radio-list mb-60">
                <li className="radio-btn">
                  <input
                    type="radio"
                    id="living"
                    value={"жилая"}
                    checked={form.property_type === "жилая"}
                    onChange={changeHandler}
                    name="property_type"
                  />
                  <label htmlFor="living">{t("editPage.residential")}</label>
                </li>
                <li className="radio-btn">
                  <input
                    type="radio"
                    id="commercial"
                    value={"коммерческая"}
                    checked={form.property_type === "коммерческая"}
                    onChange={changeHandler}
                    name="property_type"
                  />
                  <label htmlFor="commercial">{t("editPage.commercial")} </label>
                </li>
              </ul>
              <h5>{t("editPage.object")}</h5>
              <ul className="radio-list mb-50">
                {[
                  {
                    text: t("editPage.apartment"),
                    value: "квартира",
                  },
                  {
                    text: t("editPage.room"),
                    value: "комната",
                  },
                  {
                    text: t("editPage.countryHouse"),
                    value: "дача",
                  },
                  {
                    text: t("editPage.house"),
                    value: "дома",
                  },
                  {
                    text: t("editPage.partOfHouse"),
                    value: "участка",
                  },
                  {
                    text: t("editPage.townHouse"),
                    value: "таунхаус",
                  },
                  {
                    text: t("editPage.bedSpace"),
                    value: "спальное",
                  },
                ].map(({ text, value }) => (
                    <li className="radio-btn" key={value}>
                      <input
                          type="radio"
                          id={text}
                          name="object"
                          onChange={changeHandler}
                          value={value}
                          checked={form.object === value}
                      />
                      <label htmlFor={text}>{text}</label>
                    </li>
                ))}

              </ul>
              <h5>{t("editPage.location")}</h5>
              <div className="map mb-50">
                <div className="map-info">
                  <h5>Где находится?</h5>
                  <div className="map-address">
                    <input
                      ref={searchRef}
                      placeholder="г.Ташкент, ул.Охангарон 65 А 1"
                      id="suggest"
                      name="web_address_title"
                    />

                  </div>
                </div>
                <p className="error-par d-none">
                  Такой геолокации не существует
                </p>
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
                      <ZoomControl />
                      <Placemark geometry={state.center} />
                    </Map>
                  </YMaps>
                </div>
              </div>
              <h5>{t("editPage.objectImages")}</h5>
              <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>{t("editPage.supportsImgExt")}</p>
                  </div>
                  <input
                    type="file"
                    name="uploaded_images"
                    onChange={handleChange}
                    id="upload-images"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                  <label htmlFor="upload-images">Открыть</label>
                </div>
                <ul className="image-list" id="gallery">
                  {img.map((im, i) => (
                      <li key={i}>
                        <img src={getPathImage(im)} alt="house" />
                      </li>
                  ))}
                </ul>
              </div>
              <h5>{t("editPage.allInfoObjects")}</h5>
              <div className="sizes mb-50">
                <p>{t("editPage.area")}</p>
                <div className="sizes-inputs">
                  <input
                    placeholder={t("editPage.general")}
                    type="number"
                    id="general"
                    name="pm_general"
                    onChange={changeHandler}
                    required
                  />
                  <input
                    placeholder={t("editPage.residential")}
                    name="pm_residential"
                    onChange={changeHandler}
                    type="number"
                    required
                  />
                  <input
                    placeholder="Кухня"
                    name="pm_kitchen"
                    onChange={changeHandler}
                    type="number"
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>{t("editPage.numberOfRooms")}</label>
                  <input
                    placeholder={t("editPage.general")}
                    name="number_of_rooms"
                    type="number"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>{t("editPage.floor")}*</label>
                  <input
                    placeholder={t("editPage.general")}
                    name="floor"
                    type="number"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>{t("editPage.floorFrom")}</label>
                  <input
                    placeholder={t("editPage.general")}
                    name="floor_from"
                    onChange={changeHandler}
                    type="number"
                    required
                  />
                </div>
              </div>
              <h5>{t("editPage.typeOfBuilding")}</h5>
              <ul className="radio-list mb-50">
                {[
                  { value: "кирпич", text: t("editPage.brick") },
                  { value: "монолит", text: t("editPage.monolith") },
                  { value: "панель", text: t("editPage.panel") },
                  { value: "блочный", text: t("editPage.blocky") },
                ].map((item) => (
                  <li className="radio-btn" key={item.value}>
                    <input
                      type="radio"
                      id={item.value}
                      name="building_type"
                      value={item.value}
                      onChange={changeHandler}
                      checked={form.building_type === item.value}
                    />
                    <label htmlFor={item.value}>{item.text}</label>
                  </li>
                ))}
              </ul>
              <ul className="ipoteka-list mb-40">
                <li className="radio-list">
                  <h5>{t("editPage.mortgage")}</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="ipoteka-yes"
                        value={"true"}
                        onChange={changeHandler}
                        name="app_ipoteka"
                      />
                      <label htmlFor="ipoteka-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="ipoteka-no"
                        value={""}
                        name="app_ipoteka"
                        onChange={changeHandler}
                      />
                      <label htmlFor="ipoteka-no">{t("editPage.no")} </label>
                    </div>
                  </div>
                </li>
                <li className="radio-list">
                  <h5>Новостройка</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="new-buildings-yes"
                        name="app_new_building"
                        onChange={changeHandler}
                        value={"true"}
                      />
                      <label htmlFor="new-buildings-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="new-buildings-no"
                        name="app_new_building"
                        onChange={changeHandler}
                        value={""}
                      />
                      <label htmlFor="new-buildings-no">{t("editPage.no")} </label>
                    </div>
                  </div>
                </li>
                <li className="radio-list">
                  <h5>Меблирована</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="furnishings-yes"
                        name="app_mebel"
                        onChange={changeHandler}
                        value={"true"}
                      />
                      <label htmlFor="furnishings-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="furnishings-no"
                        onChange={changeHandler}
                        value={""}
                        name="app_mebel"
                      />
                      <label htmlFor="furnishings-no">{t("editPage.no")} </label>
                    </div>
                  </div>
                </li>
              </ul>
              <h5>{t("editPage.allAmenities")}</h5>
              <ul className="checkbox-list mb-40" id="amenities-list">
                {aminitiesData?.map(({ title, id }, i) => (
                  <li key={i}>
                    <label
                      htmlFor={`html${id}`}
                      className="create-product-label"
                      style={{
                        fontWeight: "600",
                        cursor: "pointer",
                        background: `${
                          aminities.includes(id) ? "rgba(238,125,62,255)" : "#f3f2f2"
                        }`,
                        color: `${
                          aminities.includes(id) ? "white" : "black"
                        }`,
                        padding: "0.8rem 1.5rem",
                        display: "flex",
                        borderRadius: "2rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <svg
                        style={{
                          fill: `${
                            aminities.includes(id) ? "white" : "black"
                          }`,
                        }}
                        className={`svg-sprite-icon icon-tags-${i + 1} w-16`}
                      >
                        <use href={`${sprite}#tags-${i + 1}`}></use>
                      </svg>
                      <p
                        style={{
                          marginLeft: "0.4rem",
                        }}
                      >
                        {title}
                      </p>
                    </label>
                    <input
                      type="text"
                      id={`html${id}`}
                      name="amenities"
                      value={id}
                      onChange={handleAmite}
                      onClick={handleAmite}
                      style={{
                        display: "none",
                      }}
                    />
                  </li>
                ))}
              </ul>
              <div className="confirm-checkbox">
                <input type="checkbox" id="confirm-data" />
                <label htmlFor="confirm-data">
                  <p>
                    Я прочитал и согласен с условиями использования <br />и
                    публикации!
                  </p>
                  <svg className="svg-sprite-icon icon-check w-12">
                    <use href={`${sprite}#check`}></use>
                  </svg>
                </label>
              </div>
              <div className="btns">
                <button className="btn btn-black" onClick={handeDraftData}>
                  {t("editPage.saveAsDraft")}
                </button>
                <button
                  className="btn btn-orange"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {t("editPage.postAnAdd")}
                </button>
              </div>
            </form>
            <div className="create-product__right">
              <h5>Контактная информация</h5>
              <div className="form">
                <h3>{t("login.areYouRegistered")}</h3>
                <p>
                  Если вы уже зарегистрированы, нажмите на кнопку{" "}
                  <span
                    onClick={() => loginModalFunc(true)}
                    id="login-modal"
                    style={{
                      fontWeight: "bold",
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {t("login.signIn")}
                  </span>
                  .{" "}
                </p>
                <form>
                  <div className="form-input">
                    <label>{t("editPage.fio")}*</label>
                    <input type="text" placeholder="ФИО" />
                  </div>
                  <div className="form-input">
                    <label>{t("editPage.phoneNumber")}*</label>
                    <input type="text" defaultValue="+998" />
                  </div>
                  <div className="form-input">
                    <label>{t("editPage.additionalPhone")}</label>
                    <input type="text" defaultValue="+998" />
                  </div>
                  <p>Telegram</p>
                  <button className="btn btn-telegram">
                    <svg className="svg-sprite-icon icon-telegram w-14">
                      <use href={`${sprite}#telegram`}></use>
                    </svg>
                    <span>t.me://channel_username</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateProduct;
