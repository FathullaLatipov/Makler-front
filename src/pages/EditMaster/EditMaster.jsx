import React, { useContext, useEffect, useRef, useState } from "react";
import avatar_image from "../../assets/img/avatar.png";
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
import { toast } from "react-toastify";
import LoadingPost from "../../components/LoadingPost/LoadingPost";
import { useParams } from "react-router-dom";
import { baseURL } from "../../requests/requests";
import ContextApp from "../../context/context";
import $host from "../../http";

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

export default function EditMaster() {
  const theme = useTheme();
  const { id } = useParams();
  const [personName, setPersonName] = React.useState([]);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const [names, setNames] = useState([]);
  const [imgUrl, setImgUrl] = useState();
  const { navigateToProfile } = useContext(ContextApp);
  const fileHandle = (e) => {
    const img = e.target.files[0];
    setFile(img);
    let reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = function () {
      setImgUrl(reader.result);
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
    window.document.title = "Редактировать";
    $host
      .get(`${baseURL}/master/api/v1/maklers/professions`)
      .then((res) => setNames(res.data.results))
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      });
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

  // const { form, changeHandler } = useForm({
  //   name: "",
  //   email: "",
  //   // image:
  //   //   "https://api.makleruz.uz//media/master_image/UIC_Group_-_Google_Chrome_25.11.2022_11_12_00.png",
  //   phone: 998,
  //   address_title: searchRef.current?.value,
  //   address_latitude: state.center[0],
  //   address_longitude: state.center[1],
  //   password: "",
  //   profession: [],
  //   descriptions: "",
  //   experience: 0,
  //   serviceType: 1,
  // });

  const [form, setForm] = useState({
    name: "",
    email: "",
    // image:
    //   "https://api.makleruz.uz//media/master_image/UIC_Group_-_Google_Chrome_25.11.2022_11_12_00.png",
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

  useEffect(() => {
    $host
      .get(`${baseURL}/master/api/v1/maklers/update/${id}`)
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
    setForm((prev) => {
      return {
        ...prev,
        name: editData?.name,
        email: editData?.email,
        phone: editData?.phone,
        address_title: editData?.address_title,
        address_latitude: editData?.address_latitude,
        address_longitude: editData?.address_longitude,
        password: editData?.password,
        profession: [],
        descriptions: editData?.descriptions,
        experience: editData?.experience,
        // serviceType: editData?.how_service,
      };
    });
  }, [editData]);

  console.log(form);

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
    // formData.append("avatar", file);
    formData.append("how_service", form.serviceType);
    // formData.append(
    //   "profession",
    //   form.profession.map((data) => data.value)
    // );
    for (const fi of form.profession) {
      formData.append("profession", fi?.id);
    }
    formData.append("descriptions", form.descriptions);
    formData.append("experience", form.experience);
    const userToken = localStorage.getItem("access");

    $host
      .put(`${baseURL}/master/api/v1/maklers/update/${id}`, formData, {
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
    <div className="container edit-page">
      {loading && <LoadingPost />}
      <div className="create-product-s">
        <div className="create-product">
          <form className="create-product__left" onSubmit={handeSubmit}>
            <h1 className="edit__card__title">
              Регистрируйтес как мастер, получите работы
            </h1>
            <p className="edit__card__text">
              Объявление будет доступно на{" "}
              <a target={"_blank"} className="text__link" href="">
                Makler.uz
              </a>{" "}
              и в наших мобильных приложениях
            </p>
            {/* <div className="card__header">
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
                  onChange={fileHandle}
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{
                    display: "none",
                  }}
                />
              </div>
            </div> */}
            <div className="editMaster__input">
              <div className="form__input">
                <label htmlFor="">
                  <span>Имя Фамилия</span>
                  <input
                    name={"name"}
                    id="name"
                    onChange={changeHandler}
                    type={"text"}
                    value={form.name}
                    placeholder="Abbos Janizakov"
                  />
                </label>
                <label id="email" htmlFor="">
                  <span>Электронная почта</span>
                  <input
                    name={"email"}
                    type={"email"}
                    onChange={changeHandler}
                    value={form.email}
                    placeholder="info@gmail.com"
                  />
                </label>
                <label htmlFor="">
                  <span>Номер телефона | Ваше логин</span>
                  <input
                    name={"phone"}
                    type={"number"}
                    value={form.phone}
                    onChange={changeHandler}
                    placeholder="90 123-45-67"
                  />
                </label>
                {/* <label htmlFor="">
                  <span>Пароль</span>
                  <input
                    name={"password"}
                    type="password"
                    onChange={changeHandler}
                    value={form.password}
                    placeholder="пусто"
                  />
                </label> */}
                <label htmlFor="">
                  <span className="text__area">Краткое описание о себе</span>
                  <textarea
                    className="textarea"
                    id=""
                    name="descriptions"
                    onChange={changeHandler}
                    value={form.descriptions}
                    placeholder="пусто"
                  ></textarea>
                </label>
              </div>
              <label htmlFor="e">
                <span className="text__area">Краткое описание о себе</span>
                <input
                  type="number"
                  id="e"
                  name="experience"
                  value={form.experience}
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
                  Выберите раздел и специализацию *
                </h2>
                <p className="second__card__text">Введите род деятельности!</p>
              </div>
              <FormControl sx={{ m: 0, width: "100%", bgcolor: "white" }}>
                <InputLabel id="demo-multiple-chip-label">-------</InputLabel>
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
            <h5>Расположение</h5>
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
              <span
                style={{
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                Тип
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
                ].map(({ text, value }) => (
                  <li className="radio-btn" key={value}>
                    <input
                      type="radio"
                      id={text}
                      name="serviceType"
                      onChange={changeHandler}
                      value={value}
                      checked={Number(form.serviceType) === value}
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
                required
              />
              <span className="checkbox__text">
                Я прочитал и согласен с условиями использования и публикации!
              </span>
            </div>

            <div className="register">
              <div>
                <button
                  type="submit"
                  onSubmit={handeSubmit}
                  className="register__btn"
                >
                  Зарегистрироватся
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
                <p className="edit__card__text">Регистрация как мастер</p>
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
