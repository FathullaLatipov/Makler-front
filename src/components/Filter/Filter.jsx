import React, { useState } from "react";
import spirite from "../../assets/img/symbol/sprite.svg";
import { useTranslation } from "react-i18next";

const Filter = React.memo(({ value, change, start }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [print, setPrint] = useState("");
  const { t } = useTranslation();

  return (
    <section className="main-s">
      <div className="nav-search">
        <div className="container">
          <ul className="nav-search-body">
            <li className="nav-search_how select-choose">
              <label className="nav-label">Как</label>
              <div
                className="choose-btn choose-btn-round"
                id="choose-how"
                onClick={() => setShow1((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{value.typeRoom ? value.typeRoom : "аpенда"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </div>
              <div className={`nav-body-choose ${show1 ? "active" : ""}`}>
                <ul>
                  <li>
                    <label
                      htmlFor="roomtype"
                      className={`btn btn-orange-light ${
                        value.typeRoom === "аденда" ? "active" : ""
                      }`}
                    >
                      аpенда
                      <input
                        type="text"
                        id="roomtype"
                        name="typeRoom"
                        value={"аденда"}
                        onClick={(e) => {
                          change(e);
                          setShow1(false);
                        }}
                        onChange={change}
                        style={{ display: "none" }}
                      />
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="roomtype2"
                      className={`btn btn-orange-light ${
                        value.typeRoom === "купить" ? "active" : ""
                      }`}
                    >
                      {t("editPage.buy")}
                      <input
                        type="text"
                        id="roomtype2"
                        name="typeRoom"
                        value={"купить"}
                        onClick={(e) => {
                          change(e);
                          setShow1(false);
                        }}
                        onChange={change}
                        style={{ display: "none" }}
                      />
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="roomtype3"
                      className={`btn btn-orange-light ${
                        value.typeRoom === "продать" ? "active" : ""
                      }`}
                    >
                      {t("editPage.sell")}
                      <input
                        type="text"
                        id="roomtype3"
                        name="typeRoom"
                        value={"продать"}
                        onClick={(e) => {
                          change(e);
                          setShow1(false);
                        }}
                        onChange={change}
                        style={{ display: "none" }}
                      />
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-search_type select-choose">
              <label className="nav-label">Тип</label>
              <div
                className="choose-btn choose-btn-link"
                id="choose-type"
                onClick={() => setShow2((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{print ? print : t("editPage.apartment")}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </div>
              <div className={`nav-body-choose ${show2 ? "active" : ""}`}>
                <ul>
                  {[
                    {
                      label: t("editPage.apartment"),
                      value: "квартира",
                    },
                    {
                      label: t("editPage.room"),
                      value: "комната",
                    },
                    {
                      label: t("editPage.countryHouse"),
                      value: "дача",
                    },
                  ].map((item, i) => (
                    <li key={i}>
                      <label
                        htmlFor={item.value}
                        className={`btn btn-orange-light ${
                          value.building === item.value ? "active" : ""
                        }`}
                      >
                        {item.label}
                        <input
                          type="text"
                          id={item.value}
                          name="building"
                          value={item.value}
                          onClick={(e) => {
                            change(e);
                            setShow2(false);
                            setPrint(item.label);
                          }}
                          onChange={change}
                          style={{ display: "none" }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
                <ul>
                  {[
                    {
                      label: "Дома",
                      value: "дома",
                    },
                    {
                      label: "Участка",
                      value: "участка",
                    },
                  ].map((item) => (
                    <li key={item.value}>
                      <label
                        htmlFor={item.value}
                        className={`btn btn-orange-light ${
                          value.building === item.value ? "active" : ""
                        }`}
                      >
                        {item.label}
                        <input
                          type="text"
                          id={item.value}
                          name="building"
                          value={item.value}
                          onClick={(e) => {
                            change(e);
                            setShow2(false);
                            setPrint(item.label);
                          }}
                          onChange={change}
                          style={{ display: "none" }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="nav-search_address">
              <label className="nav-label">{t("editPage.address")}</label>
              <a>
                <svg className="svg-sprite-icon icon-fi_navigation w-16">
                  <use href={`${spirite}#fi_navigation`}></use>
                </svg>
                <input
                  type="text"
                  name="search"
                  onChange={change}
                  placeholder="г.Ташкент, ул. Амир Темур 65 А дом"
                  className="search-input"
                />
              </a>
            </li>
            <li className="nav-search_rooms">
              <label className="nav-label">{t("singleProduct.numberOfRooms")}</label>
              <ul className="rooms-list" id="choose-room">
                {[1, 2, 3, 4, 5].map((item) => (
                  <li key={item}>
                    <label
                      htmlFor={`room${item}`}
                      className={`btn btn-orange-light ${
                        value.room === item.toString() ? "active" : ""
                      }`}
                    >
                      {item}
                      <input
                        type="text"
                        id={`room${item}`}
                        name="room"
                        value={item}
                        onClick={(e) => {
                          change(e);
                          setShow1(false);
                        }}
                        onChange={change}
                        style={{ display: "none" }}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button
                className="btn show-btn-orange btn-search"
                onClick={() => window.location.reload()}
              >
                Очистить
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="main"></div>
      </div>
    </section>
  );
});

export default Filter;
