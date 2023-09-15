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
import { baseURL } from "../../requests/requests";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import $host from "../../http";
import { useTranslation } from "react-i18next";

const EditHouse = () => {
  const [navActive, setNavActive] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [editData, setEditData] = useState([]);
  const [aminities, setAminities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginModalFunc, navigateToProfile } = useContext(ContextApp);
  const { t } = useTranslation();
  const initialState = {
    title: "",
    center: [40.783388, 72.350663],
    zoom: 12,
  };

  const { id } = useParams();

  useEffect(() => {
    window.document.title = "Редактировать";
    $host.get(`/products/api/v1/houses/updates/${id}`)
      .then((res) => {
        setEditData(res.data);
        setAminities((prev) => {
          return [...prev, ...res.data.amenities];
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const [file, setFile] = useState([]);
  const [img, setImg] = useState([]);
  const [form, setFormData] = useState({
    title: "",
    descriptions: "",
    price: "",
    price_type: "",
    type: "",
    rental_type: "",
    property_type: "",
    object: "",
    web_address_title: "",
    web_address_latitude: "",
    web_address_longtitude: "",
    pm_general: "",
    pm_residential: "",
    pm_kitchen: "",
    number_of_rooms: "",
    floor: "",
    floor_from: "",
    building_type: "",
    app_ipoteka: "",
    app_mebel: "",
    app_new_building: "",
    phone_number: "",
    how_sale: "",
    isBookmarked: "",
  });
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setFormData({
      title: editData?.title,
      descriptions: editData?.descriptions,
      price: editData?.price,
      price_type: editData?.price_type,
      type: editData?.type,
      rental_type: editData?.rental_type,
      property_type: editData?.property_type,
      object: editData?.object,
      web_address_title: editData?.web_address_title,
      web_address_latitude: editData?.web_address_latitude,
      web_address_longtitude: editData?.web_address_longtitude,
      pm_general: editData?.pm_general,
      pm_residential: editData?.pm_residential,
      pm_kitchen: editData?.pm_kitchen,
      number_of_rooms: editData?.number_of_rooms,
      floor: editData?.floor,
      floor_from: editData?.floor_from,
      building_type: editData?.building_type,
      app_ipoteka: editData?.app_ipoteka,
      app_mebel: editData?.app_mebel,
      app_new_building: editData?.app_new_building,
      phone_number: editData?.phone_number,
      how_sale: [1],
      isBookmarked: editData?.isBookmarked,
    });
  }, [editData]);

  const postData = (data) => {
    setLoading(true);
    $host
      .put(`/products/api/v1/houses/updates/${id}`, data)
      .then(() => {
        toast.success(t("editPage.success"));
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
    formData.append("web_address_latitude", initialState.center[0]);
    formData.append("web_address_longtitude", initialState.center[1]);
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
    formData.append("draft", editData?.draft);
    for (const fi of file) {
      formData.append("uploaded_images", fi);
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
    formData.append("phone_number", form.phone_number);
    formData.append("isBookmarked", form.isBookmarked);
    formData.append("how_sale", form.how_sale);
    formData.append("draft", true);
    for (const fi of file) {
      formData.append("uploaded_images", fi);
    }
    for (const aminit of aminities) {
      formData.append("amenities", aminit);
    }

    postData(formData);
  };

  useEffect(() => {
    const fileReaders = [];
    let isCancel = false;
    if (img?.length) {
      const promises = img.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReaders.push(fileReader);
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result) {
              resolve(result);
            }
          };
          fileReader.onabort = () => {
            reject(new Error("File reading aborted"));
          };
          fileReader.onerror = () => {
            reject(new Error("Failed to read file"));
          };
          fileReader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then((images) => {
          if (!isCancel) {
            setImg(images);
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [img]);

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
                {t("create.title")}
              </h2>
              <p className="subtitle">
                {t("editPage.announcementWillBeAvailable")}
                <a href="makler.uz">Makler.uz</a> и
                {t("editPage.andInOurMobileApp")}
              </p>
              <h5>{t("create.adTitle")}</h5>
              <div className="form-input">
                <input
                  placeholder={t("editPage.empty")}
                  id="title-product"
                  type="text"
                  value={form.title}
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
                  type="text"
                  name="descriptions"
                  value={form.descriptions}
                  onChange={changeHandler}
                  required
                ></textarea>
              </div>
              <h5>{t("editPage.price")}</h5>
              <div className="form-price">
                <input
                  type="number"
                  placeholder={t("create.price")}
                  value={form.price}
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
                            required
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
                    value="аденда"
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
                    required
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
                    checked={form.rental_type === "несколько месяцев"}
                    required
                    value="несколько месяцев"
                  />
                  <label htmlFor="month">{t("editPage.forFewMonths")}</label>
                </li>
                <li className="switch-btn">
                  <input
                    type="radio"
                    onChange={changeHandler}
                    id="day"
                    name="rental_type"
                    checked={form.rental_type === "посуточно"}
                    required
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
                    required
                    onChange={changeHandler}
                    name="property_type"
                  />
                  <label htmlFor="living">{t("editPage.residential")} </label>
                </li>
                <li className="radio-btn">
                  <input
                    type="radio"
                    id="commercial"
                    value={"коммерческая"}
                    checked={form.property_type === "коммерческая"}
                    required
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
                      required
                      checked={form.object === value}
                    />
                    <label htmlFor={text}>{text}</label>
                  </li>
                ))}
              </ul>
              <h5>{t("editPage.location")}</h5>
              <div className="map mb-50">
                <div className="map-info">
                  <h5>{t("create.whereIs")}</h5>
                  <div className="map-address">
                    <input
                      ref={searchRef}
                      placeholder="г.Ташкент, ул.Охангарон 65 А 1"
                      id="suggest"
                      name="web_address_title"
                      // onChange={changeHandler}
                      // value={form.web_address_title}
                    />
                    {/* <button className="btn btn-black" id="save-address">
                      Сохранить
                    </button> */}
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
                      // state={state}s
                      state={{
                        center: state?.center,
                        zoom: 12,
                      }}
                      onLoad={setMapConstructor}
                      onBoundsChange={handleBoundsChange}
                      instanceRef={mapRef}
                    >
                      {/* <div
                        style={{
                          width: "1rem",
                          height: "1rem",
                          background: "#000",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -100%)",
                          zIndex: 3000,
                        }}
                      ></div> */}
                      <GeolocationControl {...geolocationOptions} />
                      <ZoomControl />
                      <Placemark geometry={state.center} />
                    </Map>
                  </YMaps>
                </div>
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
                    value={form.pm_general}
                    onChange={changeHandler}
                    required
                  />
                  <input
                    placeholder={t("editPage.residential")}
                    name="pm_residential"
                    value={form.pm_residential}
                    onChange={changeHandler}
                    type="number"
                    required
                  />
                  <input
                    placeholder="Кухня"
                    name="pm_kitchen"
                    value={form.pm_kitchen}
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
                    value={form.number_of_rooms}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="sizes-input">
                  <label>{t("editPage.floor")}*</label>
                  <input
                    placeholder={t("editPage.general")}
                    name="floor"
                    value={form.floor}
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
                    value={form.floor_from}
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
                      required
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
                        checked={form.app_ipoteka}
                      />
                      <label htmlFor="ipoteka-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="ipoteka-no"
                        value={""}
                        checked={!form.app_ipoteka}
                        name="app_ipoteka"
                        onChange={changeHandler}
                      />
                      <label htmlFor="ipoteka-no">{t("editPage.no")} </label>
                    </div>
                  </div>
                </li>
                <li className="radio-list">
                  <h5>{t("create.buildings")}</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="new-buildings-yes"
                        name="app_new_building"
                        onChange={changeHandler}
                        value={"true"}
                        checked={form.app_new_building}
                      />
                      <label htmlFor="new-buildings-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="new-buildings-no"
                        name="app_new_building"
                        onChange={changeHandler}
                        checked={!form.app_new_building}
                        value={""}
                      />
                      <label htmlFor="new-buildings-no">{t("editPage.no")} </label>
                    </div>
                  </div>
                </li>
                <li className="radio-list">
                  <h5>{t("create.furnished")}</h5>
                  <div className="radios">
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="furnishings-yes"
                        name="app_mebel"
                        onChange={changeHandler}
                        checked={form.app_mebel}
                        value={"true"}
                      />
                      <label htmlFor="furnishings-yes">{t("editPage.yes")}</label>
                    </div>
                    <div className="radio-btn">
                      <input
                        type="radio"
                        id="furnishings-no"
                        onChange={changeHandler}
                        checked={!form.app_mebel}
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
                          aminities?.includes(value) ? "rgba(238,125,62,255)" : "white"
                        }`,
                        color: `${
                          aminities?.includes(value) ? "white" : "black"
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
                  {t("create.agreeWithTerms")}
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
                {/* <button className="btn btn-orange">
                  Опубликовать объявление{" "}
                </button> */}
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

export default EditHouse;
