import React, { useContext, useEffect, useRef, useState } from "react";
import avatar_image from "../.././assets/img/avatar_change.png";
import "./EditPage.css";
import sprite from "../../assets/img/symbol/sprite.svg";
import {
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
} from "@pbe/react-yandex-maps";
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
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import LoadingPost from "../LoadingPost/LoadingPost";
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function EditPage() {
  const theme = useTheme();
  const [fileImage, setFileImage] = useState([]);
  const [img, setImg] = useState([]);
  const { navigateToProfile } = useContext(ContextApp);
  const [personName, setPersonName] = React.useState([]);
  const [file, setFile] = useState();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [filterService, setFilterService] = useState([]);
  const { t } = useTranslation();

  const fileHandle = (e) => {
    const img = e.target.files[0];
    setFile(img);
    let reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = function () {
      setImgUrl(reader.result);
    };
  };

  const fetchData = async () => {
    try {
      const professionsRes = await $host.get(`master/api/v1/maklers/professions`);
      const filterServiceRes = await $host.get("/master/api/v1/maklers/filter-service/");
      setNames(professionsRes.data.results);
      setFilterService(filterServiceRes.data.results);
      console.log(filterServiceRes)
    } catch (e) {
      console.log(e);
      toast.error("Ошибка!");
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const initialState = {
    title: "",
    center: [40.783388, 72.350663],
    zoom: 12,
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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

  const handleChange2 = (e) => {
    const { files } = e.target;
    setFileImage([...files]);
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

  const { form, changeHandler } = useForm({
    name: "",
    email: "",
    phone: 998,
    address_title: searchRef.current?.value,
    address_latitude: state.center[0],
    address_longitude: state.center[1],
    password: "",
    profession: [],
    descriptions: "",
    experience: 0,
    serviceType: 1,
  });

  const handeSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", Number(form.phone));
    formData.append("address_title", searchRef.current?.value);
    formData.append("address_latitude", form.address_latitude);
    formData.append("address_longitude", form.address_longitude);
    formData.append("password", form.password);
    formData.append("avatar", file);
    formData.append("how_service", form.serviceType);
    // formData.append(
    //   "profession",
    //   form.profession.map((data) => data.value)
    // );
    for (const fi of form.profession) {
      formData.append("profession", fi?.id);
    }
    for (const fi of fileImage) {
      formData.append("uploaded_images", fi);
    }
    formData.append("descriptions", form.descriptions);
    formData.append("experience", form.experience);
    const userToken = localStorage.getItem("access");

    $host
      .post("https://api.makleruz.uz/master/api/v1/maklers/create/", formData, {
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
    <div className="container edit-page">
      {loading && <LoadingPost />}
      <div className="create-product-s">
        <div className="create-product">
          <form className="create-product__left" onSubmit={handeSubmit}>
            <h1 className="edit__card__title">
              {t("create.registerAsMaster")}
            </h1>
            <p className="edit__card__text">
              {t("editPage.announcementWillBeAvailable")}{" "}
              <a target={"_blank"} className="text__link" href="">
                Makler.uz
              </a>{" "}
             {t("editPage.andInOurMobileApp")}
            </p>
            <div className="card__header">
              <img
                className="avatar__img"
                src={imgUrl ? imgUrl : avatar_image}
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
                  {t("create.changeAvatarImg")}
                </label>
                <input
                  type={"file"}
                  onChange={fileHandle}
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
                  <span>{t("editPage.fio")}</span>
                  <input
                    name={"name"}
                    id="name"
                    onChange={changeHandler}
                    type={"text"}
                    placeholder="Abbos Janizakov"
                  />
                </label>
                <label id="email" htmlFor="">
                  <span>{t("editPage.email")}</span>
                  <input
                    name={"email"}
                    type={"email"}
                    onChange={changeHandler}
                    placeholder="info@gmail.com"
                  />
                </label>
                <label htmlFor="">
                  <span>{t("editPage.phoneNumberAndLogin")}</span>
                  <input
                    name={"phone"}
                    type={"number"}
                    onChange={changeHandler}
                    placeholder="90 123-45-67"
                  />
                </label>
                <label htmlFor="">
                  <span>{t("editPage.password")}</span>
                  <input
                    name={"password"}
                    type="password"
                    onChange={changeHandler}
                    placeholder={t("editPage.empty")}
                  />
                </label>
                <label htmlFor="">
                  <span className="text__area">{t("editPage.shortDescriptionAboutMe")}</span>
                  <textarea
                    className="textarea"
                    id=""
                    name="descriptions"
                    onChange={changeHandler}
                    placeholder={t("editPage.empty")}
                  ></textarea>
                </label>
              </div>
              <label htmlFor="e">
                <span className="text__area">{t("editPage.experience")}</span>
                <input
                  type="number"
                  id="e"
                  name="experience"
                  onChange={changeHandler}
                  placeholder="experience"
                  style={{
                    width: "100%",
                  }}
                />
              </label>
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
                  name="profession"
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
                          key={value.id}
                          label={value.title}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names?.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name}
                      style={getStyles(name.id, personName, theme)}
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
                marginBottom: "1.5rem",
              }}
            >
              <div className="map-info">
                <h5>{t("create.whereIs")}</h5>
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
            <h5>{t("editPage.objectImages")}</h5>
            <div className="image-upload mb-50">
              <div className="image-outer">
                <div className="image-outer-info">
                  <h5>{t("create.dragImageText")}</h5>
                  <p>{t("editPage.supportsImgExt")}</p>
                </div>
                <input
                  type="file"
                  name="uploaded_images"
                  onChange={(e) => handleChange2(e)}
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
                {filterService.map(({ title, id }) => (
                  <li className="radio-btn" key={id}>
                    <input
                      type="radio"
                      id={title}
                      name="serviceType"
                      onChange={changeHandler}
                      value={id}
                      checked={Number(form.serviceType) === id}
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
                required
              />
              <span className="checkbox__text">
                {t("editPage.agreeWithTerms")}
              </span>
            </div>

            <div className="register">
              <div>
                <button
                  type="submit"
                  onSubmit={handeSubmit}
                  className="register__btn"
                >
                  {t("create.register")}
                </button>
              </div>
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
