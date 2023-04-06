import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import spirite from "../../assets/img/symbol/sprite.svg";
import { baseURL } from "../../requests/requests";
import LoadingPost from "../LoadingPost/LoadingPost";

const UserContents = ({ data, content, mounted, draft }) => {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    switch (content) {
      case "house":
        navigate(`/edit-house/${data.id}`);
        break;
      case "store":
        navigate(`/edit-store/${data.id}`);
        break;
      case "master":
        navigate(`/edit-master/${data.pk}`);
        break;
      case "mebel":
        navigate(`/edit-mebel/${data.id}`);
        break;
      default:
        break;
    }
  };

  const deleteData = (url, id) => {
    axios
      .delete(`${url}/${id}/`)
      .then(() => {
        toast.success("Успешно");
        mounted((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => setDisplay(false));
  };

  const clickHandle = () => {
    switch (content) {
      case "house":
        deleteData(
          "https://api.makleruz.uz//products/api/v1/houses/delete",
          data.id
        );
        break;
      case "store":
        deleteData("https://api.makleruz.uz//store2/api/v1/store/delete", data.id);
        break;
      case "master":
        deleteData("https://api.makleruz.uz//master/api/v1/maklers/delete", data.pk);
        break;
      case "mebel":
        deleteData("https://api.makleruz.uz//mebel/api/v1/mebels/delete", data.id);
        break;
      default:
        break;
    }
  };

  const draftFunc = (url) => {
    setLoading(true);
    axios
      .patch(url, {
        draft: !draft,
        product_status: 0,
      })
      .then(() => {
        toast.success("Успешно!");
        mounted((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => {
        setLoading(false);
        setDisplay(false);
      });
  };
  const addedToDraftFunc = (url) => {
    setLoading(true);
    axios
      .patch(url, {
        product_status: data?.product_status !== 3 ? 3 : 0,
        draft: false,
      })
      .then(() => {
        toast.success("Успешно!");
        mounted((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка!");
      })
      .finally(() => {
        setLoading(false);
        setDisplay(false);
      });
  };

  const draftHandle = () => {
    switch (content) {
      case "house":
        draftFunc(`${baseURL}/products/api/v1/houses/patch-updates/${data.id}`);
        break;
      case "master":
        // https://api.makleruz.uz/
        draftFunc(`${baseURL}/master/api/v1/maklers/patch-update/${data.pk}`);
        break;
      case "store":
        draftFunc(`${baseURL}/store2/api/v1/store/patch-update/${data.id}`);
        break;
      case "mebel":
        draftFunc(`${baseURL}/mebel/api/v1/mebels/patch-update/${data.id}`);
        break;

      default:
        break;
    }
  };
  const addedToDraft = () => {
    switch (content) {
      case "house":
        addedToDraftFunc(
          `${baseURL}/products/api/v1/houses/patch-updates/${data.id}`
        );
        break;
      case "master":
        // https://api.makleruz.uz/
        addedToDraftFunc(
          `${baseURL}/master/api/v1/maklers/patch-update/${data.pk}`
        );
        break;
      case "store":
        addedToDraftFunc(
          `${baseURL}/store2/api/v1/store/patch-update/${data.id}`
        );
        break;
      case "mebel":
        addedToDraftFunc(
          `${baseURL}/mebel/api/v1/mebels/patch-update/${data.id}`
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      {loading && <LoadingPost />}
      <li className="advert-item">
        <div
          className="advert-settings"
          style={{
            position: "absolute",
            right: "0.8rem",
            zIndex: 30,
          }}
        >
          <button
            className="btn btn-settings"
            onClick={() => setDisplay((prev) => !prev)}
          >
            <svg className="svg-sprite-icon icon-dots w-16">
              <use href={`${spirite}#dots`}></use>
            </svg>
          </button>
          <div
            className={`advert-settings-body choose-body ${
              display && "active"
            }`}
          >
            <ul>
              <li
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                }}
              >
                {" "}
                <span>Изменить </span>
              </li>
              <li
                onClick={draftHandle}
                style={{
                  cursor: "pointer",
                }}
              >
                {" "}
                <span>{draft ? "Разархивировать" : "Архивировать"} </span>
              </li>
              <li
                onClick={addedToDraft}
                style={{
                  cursor: "pointer",
                }}
              >
                {" "}
                <span>
                  {data?.product_status !== 3
                    ? "Добавить в черновик"
                    : "Удалить из черновика"}{" "}
                </span>
              </li>
              <li
                onClick={clickHandle}
                style={{
                  cursor: "pointer",
                }}
              >
                {" "}
                <span>Удалить </span>
              </li>
            </ul>
          </div>
        </div>
        <Link
          to={
            content === "house"
              ? `/product/${data.id}`
              : content === "store"
              ? `/industria/${data.id}`
              : content === "master"
              ? `/master/${data.pk}`
              : `/mebel/${data.id}`
          }
          style={{
            display: "block",
          }}
          className="advert-item__top"
        >
          {"product_status" in data && data?.product_status !== 3 ? (
            <div
              className={`advert-item-status ${
                data.product_status === 0
                  ? "wait-status"
                  : data.product_status === 1
                  ? "done-status"
                  : data.product_status === 2 && "error-status"
              }`}
            >
              {" "}
              <span className="advert-item-status-icon">
                <svg className="svg-sprite-icon icon-dots-horizontal fill-n">
                  <use href={`${spirite}#dots-horizontal`}></use>
                </svg>
              </span>
              <span>
                {data.product_status === 0
                  ? "Ожидание подтверждения"
                  : data.product_status === 1
                  ? "Подтвержден"
                  : data.product_status === 2 && "Отказaна!"}
              </span>
            </div>
          ) : (
            ""
          )}

          <picture>
            {"images" in data ? (
              <>
                <source srcSet={data.images[0]?.images} type="image/webp" />
                <img src={data.images[0]?.images} alt="Картинка Объявления" />
              </>
            ) : "avatar" in data ? (
              <>
                <source srcSet={data.avatar} type="image/webp" />
                <img src={data.avatar} alt="Картинка Объявления" />
              </>
            ) : (
              <>
                <source srcSet={data.image} type="image/webp" />
                <img src={data.image} alt="Картинка Объявления" />
              </>
            )}
          </picture>
        </Link>
        <div className="advert-item__bottom">
          <div className="advert-item-info">
            <div className="advert-item-info__top">
              <p>{"name" in data ? data.name : data.title}</p>
              <span>
                {"price" in data
                  ? `${data.price} ${
                      data.price_type.price_t ? data.price_type.price_t : "y.e"
                    }`
                  : data.phone}
              </span>
            </div>
            <div className="advert-item-info__bottom">
              <p>{"address" in data ? data.address : data.web_address_title}</p>
              {/* <span>22:52</span> */}
            </div>
            <ul className="statistic-list">
              <li>
                {" "}
                <span>Просмотры: {data?.view_count}</span>
                <strong>{data.pm}</strong>
              </li>
              <li>
                {/* <span>Комментарии: </span>
              <strong>{data.comment}</strong>
            </li>
            <li>
              <span>Лайки:</span>
              <strong>{data.like}</strong> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="advert-item-date">
          <p>
            {/* Дата создание: <span>12 Август. 2022 | </span>

            <span>19:32</span> */}
            {data.date}
          </p>
        </div>
      </li>
    </>
    // <h1>fjadsl</h1>
  );
};

export default UserContents;
