import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sprite from "../../assets/img/symbol/sprite.svg";
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

const products = ["/images/new.jpeg", "/images/new2.jpeg"];

const BannerCarousel = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.makleruz.uz/api/v1/carousels/")
      .then((res) => setBannerData(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Card>
        <Slider
            infinite={true}
            speed={2000}
            autoplay={true}
            autoplaySpeed={5000}
            slidesToShow={1}
            slidesToScroll={1}
            nextArrow={<CustomRightArrow />}
            prevArrow={<CustomLeftArrow />}
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
`;

export default BannerCarousel;
