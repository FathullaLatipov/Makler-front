import "./SingleProduct.scss";
import sprite from "../../assets/img/symbol/sprite.svg";
import {
  DownloadApp,
  FooterMenu,
  LoadingPost,
  SliderContent,
} from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import ContextApp from "../../context/context";
import ProductCard from "../../components/ProductCard/ProductCard";
import $host, {WEB_URL} from "../../http";
import {toast} from "react-toastify";
import FavoriteSvg from "../../UI/FavoriteSvg";
import ShareSvg from "../../UI/ShareSvg";


const SingleProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recomendLoading, setRecomendLoading] = useState(false);
  const [recomdend, setRecomdend] = useState([]);
  const { houseData, getHouseData, loginModalFunc, favorites, setFavorites, userData } = useContext(ContextApp);
  const hasInWishlist = favorites.find((item) => item.product.id === +id);

  const slice = (str) => {
    return str.substr(32);
  };

  useEffect(() => {
    setLoading(true);
    $host
      .get(`/products/web/api/v1/houses/${id}`)
      .then((data) => {
        getHouseData(data.data);
        window.document.title = data?.data?.title;
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    $host
      .get(`/products/web/api/v1/all-web-houses/popular`)
      .then((res) => {
        setRecomdend(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const shareLink = () => {
    const link = WEB_URL + "product/" + houseData.id + "/";
    navigator.clipboard.writeText(link);
    if (navigator.share) {
      navigator.share({
        url: link
      })
          .then(() => toast.success("Ссылка скопирована"))
          .catch((error) => toast.error('Ошибка при попытке поделиться:', error));
      return;
    } else {
      console.log('API поделиться не поддерживается в данном браузере.');
    }
    toast.success("Ссылка скопирована");
  };

  const addToFavorites = async () => {
    const userId = window.localStorage.getItem("userId");
    if(!userId) {
      return loginModalFunc(true);
    }
    setLoading(true);

    try {
      if(hasInWishlist) {
        await $host.delete( `/products/api/v1/houses/wishlist-houses/${hasInWishlist.id}/`);
        setFavorites(prev => prev.filter((item) => item.id !== hasInWishlist.id));
        toast.success("Успешно!");
      } else {
        const { data } = await $host.post(`/products/api/v1/houses/wishlist-houses/`, {
          user: userId,
          product: id,
        });
        setFavorites(prev => ([...prev, { ...data, product: { id: data.product } }]));
        toast.success("Успешно!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Ошибка!");
      setLoading(false);
    }
    setLoading(false);
  };


  return (
    <div
      style={{paddingTop: "2rem"}}
    >
      {loading && <LoadingPost />}
      <section className="slider-s">
        <div className="container">
          <div className="slider-body">
            <div
              className="slider__left"
              style={{
                position: "relative",
              }}
            >
              <div className="swiper">
                {houseData?.images?.length && (
                  <SliderContent imgUrl={houseData?.images} />
                )}
              </div>
            </div>
            <div className="slider__right">
              <ul>
                {houseData?.images?.length &&
                  houseData?.images
                    ?.filter((_, i) => i <= 3)
                    ?.map((item, i) => (
                      <li key={i}>
                        <img src={item.images} alt="Картинка 1" />
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="info-product-s">
        <div className="container">
          <h2 className="product-info-title">{houseData?.title}</h2>
          <p className="product-info-par">{houseData?.web_address_title}</p>
          <div className="info-product">
            <div className="info-product-sidebar">
              <div className="plashka">
                <h4>Стоимость:</h4>
                <strong>
                  {houseData?.price} {houseData?.price_type?.price_t}
                </strong>
                <a className="btn btn-orange" href="tel:035252434">
                  Позвонить маклеру
                </a>
              </div>

              <div className="info-product-share">
                <button
                    className="btn btn-white"
                    onClick={shareLink}
                >
                  Поделиться
                  <ShareSvg/>
                </button>
                {userData && (
                    <button
                        className={`add-favorite btn ${hasInWishlist ? "btn-orange" : "btn-white"}`}
                        onClick={addToFavorites}
                    >
                      {hasInWishlist ? "В избранные" : "Удалить с избранного"}
                      <FavoriteSvg isActive={!hasInWishlist}/>
                    </button>
                )}
              </div>
            </div>
            <div className="info-product-main">
                <h2 className="info-product-title">{houseData?.title}</h2>
                <h5 className="product-small-title">Вся информация</h5>
                <ul className="tags-list">
                  <li className="tags-item">
                    {" "}
                    <span>Тип аренды</span>
                    <p>{houseData?.rental_type}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Тип недвижимости</span>
                    <p>{houseData?.property_type}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Объект</span>
                    <p>{houseData?.object}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Этаж</span>
                    <p>{houseData?.floor}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Жилая площадь</span>
                    <p>{houseData?.pm_residential}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Кол-во комнат</span>
                    <p>{houseData?.number_of_rooms}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Общая плошадь</span>
                    <p>{houseData?.pm_general}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Этажность дома</span>
                    <p>{houseData?.floor_from}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Тип строения</span>
                    <p>{houseData?.building_type}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Ипотека</span>
                    <p>{houseData?.app_ipoteka ? "Да" : "Нет"}</p>
                  </li>
                  <li className="tags-item">
                    {" "}
                    <span>Мебелирование</span>
                    <p>{houseData?.app_mebel ? "Да" : "Нет"}</p>
                  </li>
                </ul>
                <h5 className="product-small-title">Описание</h5>
                <p className="product-par par">{houseData?.descriptions}</p>
                <h5 className="product-small-title">Все удобства</h5>
                <ul className="comfort-tags-list">
                  {houseData?.amenities?.map((item, i) => (
                    <li
                      style={{
                        backgroundColor: "#f3f2f2",
                        border: "none",
                      }}
                      key={i}
                      className="comfort-tags-item"
                    >
                      <svg className={`svg-sprite-icon icon-tags-${i + 1} w-16`}>
                        <use href={`${sprite}#tags-${item.id}`}></use>
                      </svg>
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="show-on-map">
                  <div className="show-on-map-address">
                    <svg className="svg-sprite-icon icon-fi_navigation w-16 fill-w">
                      <use href={`${sprite}#fi_navigation`}></use>
                    </svg>
                    <span>{houseData?.web_address_title}</span>
                  </div>
                  <button
                    className="btn btn-black btn-black-big"
                    onClick={() => {
                      window.open(
                        `https://maps.google.com?q=${houseData?.web_address_latitude},${houseData?.web_address_longtitude}`
                      );
                    }}
                  >
                    показать на карте
                  </button>
                </div>
                {houseData?.youtube_link ? (
                  // <Player>
                  //   <source src={houseData?.youtube_link} />
                  // </Player>
                  // <video src={houseData?.youtube_link}></video>
                  <embed
                    // style={{

                    // }}
                    className="youtube-video phone-video"
                    src={`https://www.youtube.com/embed/${slice(
                      houseData?.youtube_link
                    )}`}
                  />
                ) : (
                  ""
                )}
                <h5 className="product-small-title">Рекомендуем похожие </h5>
              </div>
            </div>
            {houseData?.youtube_link ? (
              // <Player>
              //   <source src={houseData?.youtube_link} />
              // </Player>
              // <video src={houseData?.youtube_link}></video>
              <embed
                // style={{

                // }}
                className="youtube-video desktop-video"
                src={`https://www.youtube.com/embed/${slice(
                  houseData?.youtube_link
                )}`}
              />
            ) : (
              ""
            )}
          </div>
          <div className="cards">
            <div className="container">
              <ul className="cards-list">
                {recomdend
                  ?.filter((_, i) => i <= 3)
                  ?.map((item, i) => (
                    <ProductCard key={i} data={item} />
                  ))}
              </ul>
            </div>
          </div>
      </section>
      <FooterMenu />
      <DownloadApp />
    </div>
  );
};

export default SingleProduct;
