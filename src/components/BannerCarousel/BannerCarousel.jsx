import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sprite from "../../assets/img/symbol/sprite.svg";
// import img from "../../assets/img/slider/1.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

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

const products = ["/images/new.jpeg", "/images/new2.jpeg"];

const BannerCarousel = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.makleruz.uz//api/v1/carousels/")
      .then((res) => setBannerData(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <Card>
        {/* <div className="container"> */}
        <Slider
          // adaptiveHeight={true}
          // infinite
          // dots={false}
          // slidesToShow={1}
          // slidesToScroll={1}
          // initialSlide={initialSlide || 0}
          autoplay
          autoplaySpeed={4000}
          infinite
          // dots
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          nextArrow={<CustomRightArrow />}
          prevArrow={<CustomLeftArrow />}
          // prevArrow={<Arrow />}
          // nextArrow={<NextArrow />}
          // adaptiveHeight={true}
        >
          {bannerData?.map((item, i) => (
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
        {/* </div> */}
      </Card>
    </div>
  );
};

const Card = styled.div`
  height: 35rem;
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
`;

export default BannerCarousel;
