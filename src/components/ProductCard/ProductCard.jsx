import { useContext } from "react";
import { useEffect, useId } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import sprite from "../../assets/img/symbol/sprite.svg";
import ContextApp from "../../context/context";
import { baseURL } from "../../requests/requests";
import LoadingPost from "../LoadingPost/LoadingPost";
import $host from "../../http";

const ProductCard = ({ data, wishlist, wishId, deleteMount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginModalFunc, favorites, setFavorites } = useContext(ContextApp);
  const hasInWishlist = favorites.find((item) => item.product.id === data.id);

  const handleClick = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      loginModalFunc(true);
      return;
    }
    setIsLoading(true);
    if (hasInWishlist) {
      $host.delete( `/products/api/v1/houses/wishlist-houses/${hasInWishlist.id}/`)
        .then(() => {
          setFavorites(prev => prev.filter((item) => item.id !== hasInWishlist.id));
          toast.success("Успешно!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ошибка!");
        })
        .finally(() => setIsLoading(false));
      return;
    } else {
        $host.post(`/products/api/v1/houses/wishlist-houses/`, {
          user: userId,
          product: data.id,
        })
        .then(({ data }) => {
          setFavorites(prev => ([...prev, { ...data, product: { id: data.product } }]));
          toast.success("Успешно!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ошибка!");
        })
        .finally(() => setIsLoading(false));
    }

    return setIsLoading(false);
  };

  return (
    <li className="cards-item">
      {isLoading && <LoadingPost />}
      <button
        className={`btn-save ${hasInWishlist ? "save" : ""}`}
        onClick={handleClick}
      >
        <svg className="svg-sprite-icon icon-save">
          <use href={`${sprite}#save`}></use>
        </svg>
      </button>
      <Link to={`/product/${data.id}`}>
        <div className="cards-item__top">
          <img
            src={data.images?.length && data.images[0].images}
            alt={data.title}
          />
        </div>
        <div className="cards-item__bottom">
          <div className="cards-item-info">
            <div className="cards-item-info__top">
              <p>{data.title}</p>
              <span>
                {data.price} {data?.price_type?.price_t}
              </span>
            </div>
          </div>
          <div
            className="cards-item-info__bottom"
            style={{
              paddingLeft: "1rem",
            }}
          >
            <div className="advert-item-info__bottom">
              <p>{"address" in data ? data.address : data.web_address_title}</p>
              {/* <span>22:52</span> */}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
