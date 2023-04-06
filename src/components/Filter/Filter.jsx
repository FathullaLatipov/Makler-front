import { useState } from "react";
import spirite from "../../assets/img/symbol/sprite.svg";

const Filter = ({ value, change, start }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [print, setPrint] = useState("");

  return (
    <section className="main-s">
      <div className="nav-search">
        <div className="container">
          <ul className="nav-search-body">
            <li className="nav-search_how select-choose">
              <label className="nav-label">Как</label>
              <a
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
              </a>
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
                      купить
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
                      продать
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
              <a
                className="choose-btn choose-btn-link"
                id="choose-type"
                onClick={() => setShow2((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{print ? print : "Квартиру"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </a>
              <div className={`nav-body-choose ${show2 ? "active" : ""}`}>
                <ul>
                  {[
                    {
                      label: "Квартиру",
                      value: "квартира",
                    },
                    {
                      label: "Комната",
                      value: "комната",
                    },
                    {
                      label: "Дача",
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
                    // {
                    //   label: "Town house",
                    //   value: "townhouse",
                    // },
                    // {
                    //   label: "Bed space",
                    //   value: "bed_space",
                    // },
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
              <label className="nav-label">Адрес</label>
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
              <label className="nav-label">Кол-во комнат</label>
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
      {/* <section className="categories-s">
        <div className="container">
          <div className="categories">
            <ul id="categories-list"></ul>
          </div>
        </div>
      </section> */}
    </section>
  );
};

export default Filter;
