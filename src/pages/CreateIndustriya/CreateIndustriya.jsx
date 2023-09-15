import React, { useTransition } from "react";
import avatar_image from "./../../assets/img/avatar_change.png";
import { useState, useRef, useEffect } from "react";
import sprite from "../../assets/img/symbol/sprite.svg";
import "../../components/EditPage/EditPage.css";
import {
  Box,
  MenuItem,
  OutlinedInput,
  Select,
  Chip,
  useTheme,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  GeolocationControl,
  Placemark,
  YMaps,
  Map,
} from "@pbe/react-yandex-maps";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingPost } from "../../components";
import { useContext } from "react";
import ContextApp from "../../context/context";
import $host, {WEB_URL} from "../../http";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateIndustriya() {
  const theme = useTheme();
  const { navigateToProfile } = useContext(ContextApp);
  const [loading, setLoading] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [brandText, setBrandText] = useState("");
  const [navActive, setNavActive] = useState(false);
  const [navActive2, setNavActive2] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [brandData, setBrandData] = useState([]);
  const [file, setFile] = useState();
  const [howStore, setHowStore] = useState([]);
  const [imgUrl, setImgUrl] = useState({
    brand: null,
    view: null,
  });
  const [storeAminities, setStoreAminities] = useState([]);
  const { t } = useTranslation();

  const fetchData = async () => {
    const amenitites = await $host.get("/store2/api/v1/store/amenitites");
    setStoreAminities(amenitites.data.results);
    const howStoreResponse = await $host.get("/store2/api/v1/store/how_store");
    setHowStore(howStoreResponse.data.results);
  };
  const fileHandle = (file, name) => {
    const img = file;
    setFile(img);
    let reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = function () {
      setImgUrl((prev) => {
        return {
          ...prev,
          [name]: reader.result,
        };
      });
    };
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const initialState = {
    title: "",
    center: [40.783388, 72.350663],
    zoom: 12,
  };

  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);


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

  const fetchBrands = async () => {
    try {
      const res = await $host.get(`/store2/api/v1/store/brands`)
      setBrandData(res.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchData();
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

  const [img, setImg] = useState({
    brandImg: null,
    machineImg: null,
  });
  const router = useNavigate();

  const imgHandle = (e) => {
    setImg((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  const { form, changeHandler } = useForm({
    name: "",
    description: "",
    price_type: 1,
    store_amenitites: [],
    brand: "",
    price: 0,
    use_for: "",
    phoneNumber: 0,
    email: "",
    brand_title: "",
    how_store_service: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price_type", Number(form.price_type));
    formData.append("image", img.machineImg);
    formData.append("brand_image", img.brandImg);
    formData.append("description", form.description);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("use_for", form.use_for);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("address", searchRef.current?.value);
    formData.append("email", form.email);
    formData.append("brand_title", form.brand_title);
    formData.append("how_store_service", form.how_store_service);
    for (const fi of form.store_amenitites) {
      formData.append("store_amenitites", fi.id);
    }

    $host
      .post("/store2/api/v1/store/create/", formData)
      .then((res) => {
        toast.success("Успешно!");
        navigateToProfile();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      {loading && <LoadingPost />}
      <div className="create-product-s">
        <div className="create-product edit-page">
          <form className="create-product__left" onSubmit={handleSubmit}>
            <h1 className="edit__card__title">
              Создайте свой товар
            </h1>
            <p className="edit__card__text">
              {t("editPage.announcementWillBeAvailable")}{" "}
              <a target={"_blank"} className="text__link" href={WEB_URL}>
                Makler.uz
              </a>{" "}
             {t("editPage.andInOurMobileApp")}
            </p>
            <div className="card__header">
              <img
                className="avatar__img"
                src={imgUrl.brand ? imgUrl.brand : avatar_image}
                alt="avatar image"
                width={"96px"}
                height={"96px"}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div className="image__card">
                <p className="avatar__name">
                  {t("editPage.uploadAvatarImage")}
                </p>
                <label
                  htmlFor="file"
                  className="change__btn"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Изменить фото профиля
                </label>
                <input
                  type={"file"}
                  onChange={(e) => {
                    fileHandle(e.target.files[0], "brand");
                    imgHandle(e);
                  }}
                  name="brandImg"
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{
                    display: "none",
                  }}
                />
              </div>
            </div>
            <div className="editpage__input">
              <div className="form__input">
                <label htmlFor="">
                  <span>Названия товара</span>
                  <input
                    name={"name"}
                    onChange={changeHandler}
                    id="name"
                    type={"text"}
                    placeholder="Стиральная машина"
                  />
                </label>
                <label id="email" htmlFor="">
                  <span>{t("editPage.email")}</span>
                  <input
                    name={"email"}
                    onChange={changeHandler}
                    type={"email"}
                    placeholder="info@gmail.com"
                  />
                </label>
                <label
                  htmlFor=""
                  style={{
                    marginTop: "1rem",
                  }}
                >
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
                <span className="text__area">{t("editPage.shortDescriptionAboutMe")}</span>
                <textarea
                  style={{
                    width: "100%",
                  }}
                  className="textarea"
                  name="description"
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
                      <span>{brandText ? brandText : "------"}</span>
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
                        {brandData?.map((item) => (
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
                              htmlFor={`brand${item.id}`}
                              className={`labelcha ${
                                item.id === Number(form.brand_title)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </label>
                            <input
                              type="text"
                              id={`brand${item.id}`}
                              name="brand_title"
                              onClick={(e) => {
                                changeHandler(e);
                                setNavActive2(false);
                                setBrandText(item.title);
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
            <div className="second-card">
              <div className="second__card">
                <h2 className="second__card__title">
                  {t("editPage.selectSectionAndSpecialization")}
                </h2>
                <p className="second__card__text">{t("editPage.enterYourOcupation")}</p>
              </div>
              <FormControl sx={{ m: 0, width: "100%", bgcolor: "white" }}>
                <InputLabel id="demo-multiple-chip-label">---</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="store_amenitites"
                  value={personName}
                  onChange={(e) => {
                    handleChange(e);
                    changeHandler(e);
                  }}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="---" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, i) => (
                        <Chip
                          sx={{ bgcolor: "rgba(197, 102, 34, 0.1)" }}
                          key={i}
                          label={value.title}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {storeAminities?.map((name, i) => (
                    <MenuItem
                      key={i}
                      value={name}
                      style={getStyles(name.value, personName, theme)}
                    >
                      {name.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                      fileHandle(e.target.files[0], "view");
                      imgHandle(e);
                    }}
                    id="upload-images"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                  <label htmlFor="upload-images">открыть</label>
                </div>
                <ul className="image-list" id="gallery">
                  {imgUrl.view && (
                    <li>
                      <img
                        src={imgUrl.view}
                        alt="house"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div
              style={{
                marginTop: "2rem",
              }}
            >
              <span
                style={{
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                {t("editPage.type")}
              </span>
              <ul className="radio-list mb-50">
                {howStore.map(({ title, id }) => (
                  <li className="radio-btn" key={id}>
                    <input
                      type="radio"
                      id={title}
                      name="how_store_service"
                      onChange={changeHandler}
                      value={id}
                      checked={Number(form.how_store_service) === id}
                    />
                    <label htmlFor={title}>{title}</label>
                  </li>
                ))}
              </ul>
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
                В скором времени вы сможете опубликовать объявления и поднять в ТОП!
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
