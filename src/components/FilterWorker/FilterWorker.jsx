import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import spirite from "../../assets/img/symbol/sprite.svg";
import { baseURL } from "../../requests/requests";
import $host from "../../http";
import {useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";

const FilterWorker = ({ change, value }) => {
  const location = useLocation();
  const [show1, setShow1] = useState(false);
  const [serviceTypeValue, setServiceText] = useState("");
  const [show2, setShow2] = useState(false);
  const [profess, setProfess] = useState();
  const [option1, setOption1] = useState([]);
  const isExceptionPages = ["/master"].includes(location.pathname);
  const { t } = useTranslation();

  const { profession, service } = value;
  useEffect(() => {
    $host
      .get(`${baseURL}/master/api/v1/maklers/professions`)
      .then((res) => setOption1(res.data.results))
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      });
  }, []);
 
  const serviceType = [
    {
      label: "Ремонт",
      value: 1,
    },
    {
      label: "Eвро",
      value: 2,
    },
  ];
  useEffect(() => {
    setProfess(option1[profession - 1]?.title);
    setServiceText(serviceType[service - 1]?.label);
  }, [profession]);

  useEffect(() => {
    setServiceText(serviceType[service - 1]?.label);
  }, [service]);

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
                href="#"
                id="choose-how"
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{serviceTypeValue ? serviceTypeValue : "Ремонт"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </span>
              <div className={`nav-body-choose ${show1 ? "active" : ""}`}>
                <ul>
                  {serviceType.map((item) => (
                    <li key={item.value}>
                      <label
                        htmlFor={`service${item.value}`}
                        className={`btn btn-orange-light ${
                          Number(service) === item.value ? "active" : ""
                        }`}
                      >
                        {item.label}
                        <input
                          type="text"
                          id={`service${item.value}`}
                          name="service"
                          value={item.value}
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
            <li className="nav-search_type select-choose">
              <label className="nav-label">Деятельности мастера</label>
              <a
                className="choose-btn choose-btn-link"
                id="choose-type"
                onClick={() => setShow2((prev) => !prev)}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>{profess ? profess : "Инженер"}</span>
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${spirite}#fi_chevron-down`}></use>
                </svg>
              </a>
              <div className={`nav-body-choose ${show2 ? "active" : ""}`}>
                <ul>
                  {option1?.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor={`room${item.id}`}
                        className={`btn btn-orange-light ${
                          Number(profession) === item.id ? "active" : ""
                        }`}
                      >
                        {item.title}
                        <input
                          type="text"
                          id={`room${item.id}`}
                          name="profession"
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
            </li>
            <li className={`nav-search_address ${isExceptionPages && "mb-0"}`}>
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

export default FilterWorker;
