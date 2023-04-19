import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import spirite from "../../assets/img/symbol/sprite.svg";
import { baseURL } from "../../requests/requests";

const FilterMebel = ({ change, value }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [category2, setCategoryData] = useState([]);
  const [profess, setProfess] = useState("");
  const [profess2, setProfess2] = useState("");
  const [profess3, setProfess3] = useState("");
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [option3, setOption3] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://api.makleruz.uz//store2/api/v1/store/how_store")
  //     .then((res) => {
  //       setOption2(res.data.results?.sort((a, b) => a.id - b.id));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       toast.error(err.message);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get("https://api.makleruz.uz/store2/api/v1/store/use_for")
  //     .then((res) => {
  //       setOption1(res.data.results?.sort((a, b) => a.id - b.id));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       toast.error(err.message);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}/store2/api/v1/store/brands`)
  //     .then((res) => {
  //       setOption3(res.data.results?.sort((a, b) => a.id - b.id));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       toast.error(err.message);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/mebel/api/v1/mebel-categories/`)
      .then((res) => {
        setCategoryData(res.data.results?.sort((a, b) => a.id - b.id));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }, []);

  const { useFor, how_store_service, brand_title, category } = value;

  useEffect(() => {
    setProfess(category2[category - 1]?.title);
  }, [category]);
  // useEffect(() =>  {
  //   setProfess2(option2[how_store_service - 1]?.title);
  // }, [how_store_service]);
  // useEffect(() => {
  //   setProfess3(option3[brand_title - 1]?.title);
  // }, [brand_title]);
  // console.log(brand_title);
  // console.log(option3);
  return (
    <section className="main-s">
      <div className="nav-search">
        <div className="container">
          <ul className="nav-search-body">
            <li className="nav-search_how select-choose">
              <label className="nav-label">Как</label>
              <span
                onClick={() => setShow1((prev) => !prev)}
                className="choose-btn choose-btn-round"
                id="choose-how"
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{profess ? profess : "Категория"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </span>
              <div className={`nav-body-choose ${show1 ? "active" : ""}`}>
                <ul>
                  {category2.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor={`category${item.id}`}
                        className={`btn btn-orange-light ${
                          Number(category) === item.id ? "active" : ""
                        }`}
                      >
                        {item.title}
                        <input
                          type="text"
                          id={`category${item.id}`}
                          name="category"
                          value={item.id}
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
              </div>
            </li>
            {/* <li className="nav-search_type select-choose">
              <label className="nav-label">Тип</label>
              <a
                className="choose-btn choose-btn-link"
                id="choose-type"
                onClick={() => setShow2((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{profess ? profess : "для кухни"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </a>
              <div className={`nav-body-choose ${show2 ? "active" : ""}`}>
                <ul>
                  {option1.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor={`useFor${item.id}`}
                        className={`btn btn-orange-light ${
                          Number(useFor) === item.id ? "active" : ""
                        }`}
                      >
                        {item.title}
                        <input
                          type="text"
                          id={`useFor${item.id}`}
                          name="useFor"
                          value={item.id}
                          onClick={(e) => {
                            change(e);
                            setShow2(false);
                          }}
                          onChange={change}
                          style={{ display: "none" }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </li> */}
            {/* <li className="nav-search_type select-choose">
              <label className="nav-label">Бренд</label>
              <a
                className="choose-btn choose-btn-link"
                id="choose-type"
                onClick={() => setShow3((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{profess3 ? profess3 : "Samsung"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </a>
              <div
                className={`nav-body-choose ${
                  show3 ? "active" : ""
                } brand_select`}
                style={{
                  maxHeight: "15rem",
                  overflowY: "auto",
                }}
              >
                <ul>
                  {option3?.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor={`brand_title${item.id}`}
                        className={`btn btn-orange-light ${
                          Number(brand_title) === item.id ? "active" : ""
                        }`}
                      >
                        {item.title}
                        <input
                          type="text"
                          id={`brand_title${item.id}`}
                          name="brand_title"
                          value={item.id}
                          onClick={(e) => {
                            change(e);
                            setShow3(false);
                          }}
                          onChange={change}
                          style={{ display: "none" }}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </li> */}
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
                  className="search-input"
                  placeholder="г.Ташкент, ул. Амир Темур 65 А дом"
                />
              </a>
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
      <section className="categories-s">
        <div className="container">
          <div className="categories">
            <ul id="categories-list"></ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FilterMebel;
