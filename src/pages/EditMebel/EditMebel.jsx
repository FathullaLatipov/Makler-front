import React from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { LoadingPost } from "../../components";
import { useContext } from "react";
import ContextApp from "../../context/context";
import { baseURL } from "../../requests/requests";
import $host from "../../http";
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
    text: "мебель",
    value: 1,
  },
  {
    text: "для кухни",
    value: 2,
  },
  {
    text: "бытовая техника",
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

export default function EditMebel() {
  const theme = useTheme();
  const { id } = useParams();
  const [editData, setEditData] = useState([]);
  const { navigateToProfile } = useContext(ContextApp);
  const [loading, setLoading] = useState(false);
  const [priceText, setPriceText] = useState("y.e");
  const [categoryText, setCategoryText] = useState("");
  const [navActive, setNavActive] = useState(false);
  const [navActive2, setNavActive2] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [file, setFile] = useState();
  const [imgUrl, setImgUrl] = useState({
    brand: null,
    view: null,
  });
  const { t } = useTranslation();

  // const fileHandle = (file, name) => {
  //   const img = file;
  //   // setFile(img);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(img);

  //   reader.onloadend = function () {
  //     setImgUrl((prev) => {
  //       return {
  //         ...prev,
  //         [name]: reader.result,
  //       };
  //     });
  //   };
  // };

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
    $host
      .get(`${baseURL}/mebel/api/v1/mebel-categories/`)
      .then((res) => {
        setCategoryData(res.data.results);
      })
      .catch((err) => console.log(err));
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

  const [form, setForm] = useState({
    name: "",
    logn_descriptions: "",
    short_descriptions: "",
    price_type: 1,
    store_amenitites: [],
    brand: "",
    price: 0,
    use_for: "",
    phone_number: "",
    email: "",
    how_store_service: 1,
  });

  useEffect(() => {
    window.document.title = "Редактировать";
    $host
      .get(`${baseURL}/mebel/api/v1/mebels/update/${id}`)
      .then((res) => {
        setEditData(res.data);
        // setAminities((prev) => {
        //   return [...prev, ...res.data.amenities];
        // });
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(editData);
  useEffect(() => {
    setForm({
      title: editData?.title,
      long_descriptions: editData?.short_descriptions,
      short_descriptions: editData?.short_descriptions,
      price_type: editData?.price_type,
      category: editData?.category,
      phone_number: editData?.phone_number,
      // store_amenitites: editData?.store_amenitites,
      // brand: editData?.brand,
      price: editData?.price,
      // use_for: editData?.use_for,
      // phoneNumber: editData?.phoneNumber,
      // email: editData?.email,
      // how_store_service: editData?.how_store_service,
    });
  }, [editData]);

  const [img, setImg] = useState([]);
  // const router = useNavigate();

  const imgHandleChange = (e) => {
    const { files } = e.target;
    setFile([...files]);
    const validimg = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      validimg.push(file);
    }
    if (validimg.length) {
      setImg(validimg);
      return;
    }
    alert("Selected images are not of valid type!");
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

  // const { form, changeHandler } = useForm({
  //   title: "",
  //   descriptions: "",
  //   short_descriptions: "",
  //   price_type: 1,
  //   // store_amenitites: [],
  //   category: "",
  //   price: 0,
  //   // use_for: "",
  //   // phoneNumber: 0,
  //   // email: "",
  //   // brand_title: "",
  //   // how_store_service: 1,
  // });
  const changeHandler = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price_type", Number(form.price_type));
    // formData.append("image", img.machineImg);
    // formData.append("brand_image", img.brandImg);
    formData.append("long_descriptions", form.long_descriptions);
    formData.append("short_descriptions", form.short_descriptions);
    // formData.append(
    //   "store_amenitites",
    //   form.store_amenitites.map((data) => data.value)
    // );
    // formData.append("brand", form.brand);
    // formData.append("use_for", form.use_for);
    formData.append("web_address_title", searchRef.current?.value);
    formData.append("web_address_latitude", state?.center[0]);
    formData.append("web_address_longtitude", state?.center[1]);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("phone_number", form.phone_number);
    // formData.append("address", searchRef.current?.value);
    // formData.append("email", form.email);
    // formData.append("brand_title", form.brand_title);
    // formData.append("how_store_service", form.how_store_service);
    // for (const fi of form.store_amenitites) {
    // formData.append("store_amenitites", fi.value);
    // }
    // for (const fi of file) {
    //   formData.append("uploaded_images", fi);
    // }

    const userToken = localStorage.getItem("access");

    $host
      .put(`https://api.makleruz.uz/mebel/api/v1/mebels/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        toast.success("Успешно!");
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
              Изменить мебель
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
                  <span>Мебельные названия</span>
                  <input
                    name={"title"}
                    value={form.title}
                    onChange={changeHandler}
                    id="name"
                    type={"text"}
                    placeholder=""
                  />
                </label>
                {/* <label id="email" htmlFor="">
                  <span>Электронная почта</span>
                  <input
                    name={"email"}
                    onChange={changeHandler}
                    type={"email"}
                    placeholder="info@gmail.com"
                  />
                </label> */}
                <label htmlFor="">
                  <span>{t("editPage.phoneNumberAndLogin")}</span>
                  <input
                    name={"phoneNumber"}
                    value={form.phone_number}
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
                  name="long_descriptions"
                  value={form.long_descriptions}
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
                  value={form.short_descriptions}
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
            {/* <div className="second-card">
              <div className="second__card">
                <h2 className="second__card__title">
                  Выберите раздел и специализацию *
                </h2>
                <p className="second__card__text">Введите род деятельности!</p>
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
                      {selected.map((value) => (
                        <Chip
                          sx={{ bgcolor: "rgba(197, 102, 34, 0.1)" }}
                          key={value.value}
                          label={value.text}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name.value}
                      value={name}
                      style={getStyles(name.value, personName, theme)}
                    >
                      {name.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> */}
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
              {/* <h5>{t("editPage.objectImages")}</h5> */}
              {/* <div className="image-upload mb-50">
                <div className="image-outer">
                  <div className="image-outer-info">
                    <h5>Перетащите сюда свои изображения или нажмите сюда</h5>
                    <p>Поддерживает: .jpg, .png, .jpeg</p>
                  </div>
                  <input
                    type="file"
                    name="uploaded_images"
                    // onChange={changeHandler}
                    onChange={(e) => {
                      // fileHandle(e.target.files[0], "view");
                      // imgHandle(e);
                      imgHandleChange(e);
                    }}
                    // onChange={(e) => handleChange(e)}
                    id="upload-images"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                  <label htmlFor="upload-images">открыть</label>
                </div>
                <ul className="image-list" id="gallery">
                  {img.length
                    ? img.map((im, i) => (
                        <li key={i}>
                          <img src={im} alt="house" />
                        </li>
                      ))
                    : ""}
                </ul>
              </div> */}
            </div>
            {/* <div
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
                Как
              </span>
              <ul className="radio-list mb-50">
                {[
                  {
                    text: "Аренда",
                    value: 1,
                  },
                  {
                    text: "Ремонт",
                    value: 2,
                  },
                  {
                    text: "Ремонт",
                    value: 3,
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
            </div> */}
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
