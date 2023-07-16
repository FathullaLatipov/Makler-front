import axios from "axios";
import React, {useRef} from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import avatar_image from "../../assets/img/avatar_change.png";
import {LoadingPost} from "../../components";

const UserSettings = ({ name, email, password, number, img }) => {
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imgPath = file ? file.path : img ? img : avatar_image;

  const [dataUser, setData] = useState({
    name,
    email,
    password,
    number,
  });

  useEffect(() => {
    setData({
      name: name,
      email: email,
      password: password,
      number: number,
    });
  }, [name, email, password, number]);

  const handleChange = (e) => {
    setData((prev) => {
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

    formData.append("first_name", dataUser.name);
    formData.append("email", dataUser.email);
    formData.append("phone_number", dataUser.number);
    formData.append("password", dataUser.password);
    if(file) {
      formData.append("avatar_image", file.img);
    }

    const userId = localStorage.getItem("userId");

    axios
      .put(`https://api.makleruz.uz/users/api/v1/update-user/${userId}/`, formData)
      .then(() => {
        toast.success("Успешно!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => setLoading(true));
  };

  const handleClick = () => {
    imgRef.current.click();
  }

  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    const imagePath = URL.createObjectURL(image);
    setFile({ img: image, path: imagePath });
  }

  return (
    <div className="container-sm">

      {loading && <LoadingPost/>}

      <div className="settings">
        <div className="settings-profile">
          <div className="settings-profile-logo">
            {" "}
            <picture>
              <source srcSet={imgPath} type="image/webp" />
              <img src={imgPath} alt="Логотип" />
            </picture>
          </div>
          <div className="settings-profile-info">
            <h3>{ name ? name : "Пустой" }</h3>

            <input
              style={{
                display: "none"
              }}
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imgRef}
            />

            <button
                className="btn btn-border-orange"
                onClick={handleClick}
            >
              Изменить фото профиля{" "}
            </button>

          </div>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-input">
            <label>Имя Фамилия</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={dataUser?.name}
            />
          </div>
          <div className="form-input">
            <label>Электронная почта</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={dataUser?.email}
            />
          </div>
          <div className="form-input">
            <label>Номер телефона | Ваше логин</label>
            <input
              type="text"
              name="number"
              onChange={handleChange}
              value={dataUser?.number}
            />
          </div>
          <div className="form-input">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="пусто"
              name="password"
              autoComplete={"off"}
              onChange={handleChange}
            />
          </div>
          {/* <div className="change-password">
            <h3>Изменить пароль</h3>
            <p className="change-password-subtitle">
              После создания постоянного пароля для своего профиля вам
              необходимо будет подтвердить его с помощью прикрепленного
              смс-кода!
            </p>
            <label>Пароль</label>
            <input
              type="password"
              placeholder="пусто"
              name="password"
              value={dataUser?.password}
            />
            <p className="change-password-par">
              Создайте постоянный пароль для входа в аккаунт!
            </p>
          </div> */}
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="btn btn-orange"
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
