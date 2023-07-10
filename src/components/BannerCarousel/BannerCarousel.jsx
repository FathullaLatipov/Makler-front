import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sprite from "../../assets/img/symbol/sprite.svg";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import PersonPng from "../../assets/img/PersonImg.png";
import { AppContext } from "../../store/AppStore";
import $host from "../../http";

function CustomLeftArrow({ className, style, onClick }) {
  return (
    <svg
      className={`${className} svg-sprite-icon icon-left-arr fill-n`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <use href={`${sprite}#left-arr`}></use>
    </svg>
  );
}
function CustomRightArrow({ className, style, onClick }) {
  return (
    <svg
      className={`${className} svg-sprite-icon icon-right-arr fill-n`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <use href={`${sprite}#left-arr`}></use>
    </svg>
  );
}

const BannerCarousel = () => {
  const [ { carousel }, setStore ] = useContext(AppContext);

  const fetchCarousels = async () => {

    try {
      const res = await $host.get("https://api.makleruz.uz/api/v1/carousels/");
      setStore(prev => ({ ...prev, carousel: { isLoading: false, list: res.data.results } }))
    } catch (error) {
      console.log(error);
    }

  } 
  
  useEffect(() => {
    fetchCarousels();
  }, []);

  return (
    <div className="container">
      <Card>
        <div className="person-img">
          <img 
            src={PersonPng}
            alt=""
          />
        </div>
        <Slider
            className=""
            infinite={true}
            speed={2000}
            autoplay={true}
            autoplaySpeed={5000}
            slidesToShow={1}
            slidesToScroll={1}
            nextArrow={<CustomRightArrow />}
            prevArrow={<CustomLeftArrow />}
        >
          {carousel.list?.map((item, i) => (
            <div key={i}>
              {item && (
                <div>
                  <span>
                    <img src={item.image} alt={"products"} />
                  </span>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </Card>
    </div>
  );
};

const Card = styled.div`
  height: 415px;
  width: 100%;
  /* height: 10rem; */
  @media (max-width: 768px) {
    height: 358px;
  }
  @media (max-width: 400px) {
    height: 250px;
  }
  .slick-track {
    height: 100%;
  }
  div {
    height: 100%;
  }
  .slick-slider {
    height: 100%;
    /* max-height: 300px; */
    /* @media (max-width: 768px) {
       height: 358px;
     } */
  }
  position: relative;
  img {
    width: 100%;
    height: 100%;
    max-height: auto;
    object-fit: cover;
  }
  .slick-list {
    height: 100%;
    transition: all 0.4s ease;
  }
  .slick-slide {
    text-align: center;
  }
  .icon-right-arr {
    right: 10px !important;
    top: 50% !important;
  }
  .icon-left-arr {
    left: 10px !important;
    top: 50% !important;
  }
  .person-img {
    position: absolute;
    z-index: 1;
    height: 60%;
    right: 0;
    bottom: 0;
  }
`;

export default BannerCarousel;
