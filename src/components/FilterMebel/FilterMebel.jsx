import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import spirite from "../../assets/img/symbol/sprite.svg";
import { baseURL } from "../../requests/requests";
import { useTranslation } from "react-i18next";
import $host from "../../http";


const FilterMebel = ({ change, value }) => {
  const [show1, setShow1] = useState(false);
  const [category2, setCategoryData] = useState([]);
  const [profess, setProfess] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    $host
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

  return (
    <section className="main-s">
      <div className="nav-search">
        <div className="container">
          <ul className="nav-search-body">
            <li className="nav-search_how select-choose">
              <label className="nav-label">{t("filter.category")}</label>
              <span
                onClick={() => setShow1((prev) => !prev)}
                className="choose-btn choose-btn-round"
                id="choose-how"
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{profess ? profess : t("filter.category")}</span>
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
                          name="brand_id"
                          value={item.id}
                          onClick={(e) => {
                            change(e);
                            setShow1(false);
                            setProfess(item.title);
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
            <li className="nav-search_address mb-0">
              <label className="nav-label">{t("editPage.address")}</label>
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
            <li className="mb-0">
              <button
                className="btn show-btn-orange btn-search"
                onClick={() => window.location.reload()}
              >
                {t("filter.clear")}
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
