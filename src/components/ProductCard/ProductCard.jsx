import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import sprite from "../../assets/img/symbol/sprite.svg";
import ContextApp from "../../context/context";
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
        <svg className="svg-sprite-icon icon-save" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.6006 21.5L12.6006 16.5L5.60059 21.5V5.5C5.60059 4.96957 5.8113 4.46086 6.18637 4.08579C6.56145 3.71071 7.07015 3.5 7.60059 3.5H17.6006C18.131 3.5 18.6397 3.71071 19.0148 4.08579C19.3899 4.46086 19.6006 4.96957 19.6006 5.5V21.5Z" stroke="#0B0B0B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
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
