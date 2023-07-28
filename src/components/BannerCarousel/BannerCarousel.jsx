import Slider from "react-slick";
import sprite from "../../assets/img/symbol/sprite.svg";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import PersonPng from "../../assets/img/PersonImg.png";
import { AppContext } from "../../store/AppStore";
import $host from "../../http";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {useQuery} from "react-query";

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
  const { isLoading, error, data } = useQuery("carousels", () =>
      $host.get("/api/v1/carousels/").then(({ data }) => data.results)
  , {
    onSuccess: (data) => {
      setStore(prev => ({ ...prev, carousel: { isLoading: false, list: data } }));
    }
  });

  if(isLoading) return null;

  return (
    <Container style={{ position: "relative" }}>
      <div className="person-img">
        <img
            src={PersonPng}
            alt="person-img"
        />
      </div>
      <Card>

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
          {carousel.list.map((item, i) => (
            <div key={i}>
                <div>
                  <span>
                    <img src={item.image} alt={"products"}/>
                  </span>
                </div>
            </div>
          ))}
        </Slider>

      </Card>
    </Container>
  );
};

const Container = styled.div`
  .person-img {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 5px;
  }

  .person-img > img {
    object-fit: contain;
    height: 280px;
  }

  @media(max-width: 778px) {
    .person-img > img {
      height: 200px;
    }  
  }
  
  @media(max-width: 610px) {
    .person-img > img {
      height: 150px;
      display: none;
    }
  }

  @media(max-width: 480px) {
    .person-img > img {
      height: 100px;
    }
  }
`

const Card = styled.div`
  width: 100%;
  /* height: 10rem; */
  @media (max-width: 768px) {
    //height: 358px;
  }
  @media (max-width: 400px) {
    //height: 250px;
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
