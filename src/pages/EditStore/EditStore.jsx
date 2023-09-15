import React from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingPost } from "../../components";
import { baseURL } from "../../requests/requests";
import { useContext } from "react";
import ContextApp from "../../context/context";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  {
    text: "architect",
    value: 1,
  },
  {
    text: "painter",
    value: 2,
  },
  {
    text: "electrician",
    value: 3,
  },
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EditStore() {
  const theme = useTheme();
  const { id } = useParams();
  const { navigateToProfile } = useContext(ContextApp);
  const [loading, setLoading] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [navActive, setNavActive] = useState(false);
  const [editData, setEditData] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [file, setFile] = useState();
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState({
    brand: null,
    view: null,
  });

  const [storeAminities, setStoreAminities] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.makleruz.uz/store2/api/v1/store/how_store")
      .then((res) => {
        setStoreAminities(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  }, []);

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
      // On autofill we get a stringified value.
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

  // const { form, changeHandler } = useForm({
  //   name: "",
  //   description: "",
  //   price_type: 1,
  //   store_amenitites: [],
  //   brand: "",
  //   price: 0,
  //   use_for: "",
  //   phoneNumber: 0,
  //   email: "",
  //   how_store_service: 1,
  // });

  const [form, setForm] = useState({
    name: "",
    description: "",
    price_type: 1,
    store_amenitites: [],
    brand: "",
    price: 0,
    use_for: "",
    phoneNumber: 0,
    email: "",
    how_store_service: 1,
  });

  useEffect(() => {
    window.document.title = "Редактировать";
    axios
      .get(`${baseURL}/store2/api/v1/store/update/${id}`)
      .then((res) => {
        setEditData(res.data);
        // setAminities((prev) => {
        //   return [...prev, ...res.data.amenities];
        // });
      })
      .catch((err) => console.log(err));
  }, []);

  const changeHandler = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    setForm({
      name: editData?.name,
      description: editData?.description,
      price_type: editData?.price_type,
      // store_amenitites: editData?.store_amenitites,
      brand: editData?.brand,
      price: editData?.price,
      use_for: editData?.use_for,
      phoneNumber: editData?.phoneNumber,
      email: editData?.email,
      // how_store_service: editData?.how_store_service,
    });
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price_type", Number(form.price_type));
    formData.append("image", img.machineImg);
    formData.append("brand_image", img.brandImg);
    formData.append("description", form.description);
    for (const fi of form?.store_amenitites) {
      formData.append("store_amenitites", fi?.id);
    }
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("use_for", [1]);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("address", searchRef.current?.value);
    formData.append("email", form.email);
    formData.append("how_store_service", form.how_store_service);
    formData.append("draft", editData?.draft);

    const userToken = localStorage.getItem("access");

    axios
      .put(`${baseURL}/store2/api/v1/store/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
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

  return (
    <div className="container">
      {loading && <LoadingPost />}
      <div className="create-product-s">
        <div className="create-product edit-page">
          <form className="create-product__left" onSubmit={handleSubmit}>
            <h1 className="edit__card__title">
              Регистрируйтес как мастер, получите работы
            </h1>
            <p className="edit__card__text">
            {t("editPage.announcementWillBeAvailable")}{" "}
              <a target={"_blank"} className="text__link" href="">
                Makler.uz
              </a>{" "}
             {t("editPage.andInOurMobileApp")}
            </p>
            {/* <div className="card__header">
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
                  Загрузите фото профиля или логотп компании
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
            </div> */}
            <div className="editpage__input">
              <div className="form__input">
                <label htmlFor="">
                  <span>{t("editPage.fio")}</span>
                  <input
                    name={"name"}
                    onChange={changeHandler}
                    id="name"
                    value={form.name}
                    type={"text"}
                    placeholder="Abbos Janizakov"
                  />
                </label>
                <label id="email" htmlFor="">
                  <span>{t("editPage.email")}</span>
                  <input
                    name={"email"}
                    onChange={changeHandler}
                    value={form.email}
                    type={"email"}
                    placeholder="info@gmail.com"
                  />
                </label>
                <label htmlFor="">
                  <span>{t("editPage.phoneNumberAndLogin")}</span>
                  <input
                    name={"phoneNumber"}
                    onChange={changeHandler}
                    value={form.phoneNumber}
                    type={"number"}
                    placeholder="+998 90 123-45-67"
                  />
                </label>
                {/* <label htmlFor="">
                  <span>brand name</span>
                  <input
                    name={"brand"}
                    type="text"
                    placeholder="пусто"
                    onChange={changeHandler}
                    value={form.brand}
                  />
                </label> */}
                <label htmlFor="">
                  <span className="text__area">{t("editPage.shortDescriptionAboutMe")}</span>
                  <textarea
                    className="textarea"
                    name="description"
                    onChange={changeHandler}
                    value={form.description}
                    id=""
                    placeholder={t("editPage.empty")}
                  ></textarea>
                </label>
              </div>
              <div
                style={{
                  marginTop: "2rem",
                }}
              >
                <h5>{t("editPage.price")}</h5>
                <div className="form-price">
                  <input
                    type="number"
                    placeholder="Стоимость"
                    required
                    name="price"
                    value={form.price}
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
                          <div>
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
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          sx={{ bgcolor: "rgba(197, 102, 34, 0.1)" }}
                          key={value.id}
                          label={value.title}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {storeAminities?.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name}
                      style={getStyles(name.title, personName, theme)}
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
                    // onChange={changeHandler}
                    // value={form.address_title}
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
                    {/* <ZoomControl     /> */}
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
              {/* <h5>{t("editPage.objectImages")}</h5> */}
              {/* <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>Поддерживает: .jpg, .png, .jpeg</p>
                  </div>
                  <input
                    type="file"
                    name="machineImg"
                    // onChange={changeHandler}
                    onChange={(e) => {
                      fileHandle(e.target.files[0], "view");
                      imgHandle(e);
                    }}
                    // onChange={(e) => handleChange(e)}
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
              </div> */}
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
                {[
                  {
                    text: "Аренда",
                    value: 1,
                  },
                  {
                    text: t("filter.repair"),
                    value: 2,
                  },
                ].map(({ text, value }) => (
                  <li className="radio-btn" key={value}>
                    <input
                      type="radio"
                      id={text}
                      name="how_store_service"
                      onChange={changeHandler}
                      value={value}
                      checked={Number(form.how_store_service) === value}
                    />
                    <label htmlFor={text}>{text}</label>
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
              <button className="register__btn" type="submit">
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
