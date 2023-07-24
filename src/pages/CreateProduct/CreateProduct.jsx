import "./CreateProduct.scss";
import sprite from "../../assets/img/symbol/sprite.svg";
import { useContext, useEffect, useState } from "react";
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

  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const [aminities, setAminities] = useState([]);
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [video, setVideo] = useState();
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const [points, setPoints] = useState([]);
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
    // uploaded_images: "",
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

  const postData = (data) => {
    setLoading(true);
    $host.post(
        `https://api.makleruz.uz/products/web/api/v1/web-houses/create/`, data)
      .then((res) => {
        toast.success("Успешно");
        navigateToProfile();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => setLoading(false));
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
    formData.append("youtube_link", video);
    console.log(video);
    formData.append("how_sale", form.how_sale);
    formData.append("draft", false);
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
    formData.append("youtube_link", form.youtube_link);
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

  function getPathImage(image) {
    const value = URL.createObjectURL(image);
    return value;
  }

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
                Объявление будет доступно на <a href="https://makler.uz">Makler.uz</a> и
                в наших <br />
                мобильных приложениях
              </p>
              <h5>Заголовка объявления</h5>
              <div className="form-input">
                <input
                  placeholder="пусто"
                  id="title-product"
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  required
                />
              </div>
              <h5>Краткое описание </h5>
              <div className="form-textarea">
                <textarea
                  placeholder="пусто"
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
                      Выбрано: <strong style={{color: "#c56622", cursor: "pointer"}}>{ video.name }</strong>
                    </h4>
                )}
              </div>
              <h5>Цена</h5>
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
              <h5>Выберите тип объявления</h5>
              <div className="create-product-btns mb-30">
                <div className="radio-btn-big">
                  <input
                    type="radio"
                    name="type"
                    id="rent"
                    checked={form.type === "аденда"}
                    value="аденда"
                    onChange={changeHandler}
                  />
                  <label htmlFor="rent">Сдать в аренду</label>
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
                  <label htmlFor="sale">Продажа недвижимости</label>
                </div>
              </div>
              <h5>Тип аренды</h5>
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
                  <label htmlFor="long">Длительно</label>
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
                  <label htmlFor="day">Посуточно</label>
                </li>
              </ul>
              <h5>Тип недвижимости</h5>
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
                  <label htmlFor="living">Жилая</label>
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
                  <label htmlFor="commercial">Коммерческая </label>
                </li>
              </ul>
              <h5>Объект</h5>
              <ul className="radio-list mb-50">
                {[
                  {
                    text: "Квартира",
                    value: "квартира",
                  },
                  {
                    text: "Комната",
                    value: "комната",
                  },
                  {
                    text: "Дача",
                    value: "дача",
                  },
                  {
                    text: "Дом",
                    value: "дома",
                  },
                  {
                    text: "Часть дома",
                    value: "участка",
                  },
                  {
                    text: "Таунхаус",
                    value: "таунхаус",
                  },
                  {
                    text: "Койко-место",
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
              <h5>Расположение</h5>
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
              <h5>Изображения объекта</h5>
              <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>Поддерживает: .jpg, .png, .jpeg</p>
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
              <h5>Вся информация об объекте</h5>
              <div className="sizes mb-50">
                <p>Площадь, м² *</p>
                <div className="sizes-inputs">
                  <input
                    placeholder="Общая"
                    type="number"
                    id="general"
                    name="pm_general"
                    onChange={changeHandler}
                    required
                  />
                  <input
                    placeholder="Жилая"
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
                  <label>Количество комнат *</label>
                  <input
                    placeholder="Общая"
                    name="number_of_rooms"
                    type="number"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>Этаж*</label>
                  <input
                    placeholder="Общая"
                    name="floor"
                    type="number"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>Этаж из*</label>
                  <input
                    placeholder="Общая"
                    name="floor_from"
                    onChange={changeHandler}
                    type="number"
                    required
                  />
                </div>
              </div>
              <h5>Тип строения</h5>
              <ul className="radio-list mb-50">
                {[
                  { value: "кирпич", text: "Кирпич" },
                  { value: "монолит", text: "Монолит" },
                  { value: "панель", text: "Панель" },
                  { value: "блочный", text: "Блочный" },
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
                  <h5>Ипотека</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="ipoteka-yes"
                        value={"true"}
                        onChange={changeHandler}
                        name="app_ipoteka"
                      />
                      <label htmlFor="ipoteka-yes">да</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="ipoteka-no"
                        value={""}
                        // checked={form}
                        name="app_ipoteka"
                        onChange={changeHandler}
                      />
                      <label htmlFor="ipoteka-no">нет </label>
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
                      <label htmlFor="new-buildings-yes">да</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="new-buildings-no"
                        name="app_new_building"
                        onChange={changeHandler}
                        value={""}
                      />
                      <label htmlFor="new-buildings-no">нет </label>
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
                      <label htmlFor="furnishings-yes">да</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="furnishings-no"
                        onChange={changeHandler}
                        value={""}
                        name="app_mebel"
                      />
                      <label htmlFor="furnishings-no">нет </label>
                    </div>
                  </div>
                </li>
              </ul>
              <h5>Все удобства</h5>
              <ul className="checkbox-list mb-40" id="amenities-list">
                {[
                  {
                    text: "Долгосрочная аренда",
                    value: 1,
                  },
                  {
                    text: "Family",
                    value: 2,
                  },
                  {
                    text: "3 room",
                    value: 3,
                  },
                  {
                    text: "Нотариус",
                    value: 4,
                  },
                  {
                    text: "TV",
                    value: 5,
                  },
                  {
                    text: "Рядом Корзинка",
                    value: 6,
                  },
                  {
                    text: "Wi-Fi",
                    value: 7,
                  },
                ].map(({ text, value }, i) => (
                  <li key={i}>
                    <label
                      htmlFor={`html${value}`}
                      className="create-product-label"
                      style={{
                        fontWeight: "600",
                        cursor: "pointer",
                        background: `${
                          aminities.includes(value) ? "#c56622" : "#f3f2f2"
                        }`,
                        color: `${
                          aminities.includes(value) ? "white" : "black"
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
                            aminities.includes(value) ? "white" : "black"
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
                        {text}
                      </p>
                    </label>
                    <input
                      type="text"
                      id={`html${value}`}
                      name="amenities"
                      value={value}
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
                  Сохранить как черновик
                </button>
                <button
                  className="btn btn-orange"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Опубликовать объявление
                </button>
              </div>
            </form>
            <div className="create-product__right">
              <h5>Контактная информация</h5>
              <div className="form">
                <h3>Вы зарегистрированы?</h3>
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
                    Войти
                  </span>
                  .{" "}
                </p>
                <form>
                  <div className="form-input">
                    <label>Имя Фамилия*</label>
                    <input type="text" placeholder="ФИО" />
                  </div>
                  <div className="form-input">
                    <label>Номер телефона*</label>
                    <input type="text" defaultValue="+998" />
                  </div>
                  <div className="form-input">
                    <label>Дополнительный номер телефона!*</label>
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
