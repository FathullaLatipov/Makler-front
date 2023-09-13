import React from "react";
import avatar_image from ".././../assets/img/avatar_change.png";
import ".././../components/EditPage/EditPage.css";
import { useTranslation } from "react-i18next";

export default function BookInput() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="editpage__card">
        <div className="edit__left__card">
          <div className="card__header">
            <img
              className="avatar__img"
              src={avatar_image}
              alt="avatar image"
            />
            <div className="image__card">
              <p className="avatar__name">
                {t("editPage.uploadAvatarImage")}
              </p>
              <button className="change__btn">Изменить фото профиля</button>
            </div>
          </div>
          <div className="editpage__input">
            <form className="form__input" action="" method={"post"}>
              <label htmlFor="">
                <span>{t("editPage.fio")}</span>
                <input
                  name={"name"}
                  id="name"
                  type={"text"}
                  placeholder="Abbos Janizakov"
                />
              </label>
              <label id="email" htmlFor="">
                <span>{t("editPage.email")}</span>
                <input
                  name={"email"}
                  type={"email"}
                  placeholder="info@gmail.com"
                />
              </label>
              <label htmlFor="">
                <span className="text__area">{t("editPage.shortDescriptionAboutMe")}</span>
                <textarea
                  className="textarea"
                  id=""
                  placeholder={t("editPage.empty")}
                ></textarea>
              </label>
              <span className="price-name">Price</span>
              <select
                className="select price__select"
                name="ergerg"
                id=""
                placeholder="y.e"
              >
                <option className="select__option" value="price"></option>
                <option className="select__option" value="price">
                  y.e
                </option>
                <option className="select__option" value="price">
                  $$$
                </option>
              </select>

              <label htmlFor="">
                <span>Phone Number</span>
                <input
                  className="phone-number"
                  type={"number"}
                  placeholder={"+99890 123-45-67"}
                />
              </label>
            </form>
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
            <form action="">
              <button className="register__btn">Зарегистрироватся</button>
            </form>
          </div>
        </div>
        <div className="edit__right__card">
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
                При регистрации вы вводите свой номер телефона в качестве логина
                и придумываете себе пароль. Нажав кнопку входа, вы введете свой
                номер телефона и пароль для доступа к существующему профилю.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
