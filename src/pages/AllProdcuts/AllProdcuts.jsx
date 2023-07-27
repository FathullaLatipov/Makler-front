import { Filter, Houses } from "../../components";
import sprite from "../../assets/img/symbol/sprite.svg";
import useForm from "../../hooks/useForm";
import {useCallback, useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {baseURL} from "../../requests/requests";
import styled from "styled-components";
import $host from "../../http";

const AllProducts = () => {
  const [ objects, setObjects ] = useState([]);
  const [show1, setShow1] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const { form, changeHandler } = useForm({
    typeRoom: "",
    room: "",
    building: "",
    search: "",
    sort: "",
  });

  const fetchObjects = useCallback(async () => {
    try {
      const response = await $host.get(`/products/houses/filter-web/objects`);

      let result = response.data.results;
      if(result.length > 0) {
        while(result.length < 6) {
          result = result.concat(result);
        }
      }
      setObjects(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const SliderItem = styled.div`
    background: #ffffff;
    width: 95% !important;
    border-radius: 30px;
    padding: 20px;
    text-align: center;
    margin: 0 10px;
    font-size: 15px;
  `;

  useEffect(() => {
    fetchObjects();
    window.document.title = "Продукты";
  }, []);

  const settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="content">
      <div className="container">
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <Filter value={form} change={changeHandler} />
          <div
            className="form-price"
            style={{
              marginTop: "1rem",
            }}
          >
            <div>
            </div>
            <div className="form-price-choose">
              <button
                className="choose-currency"
                type="button"
                id="select-currency"
                style={{
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => setShow1((prev) => !prev)}
              >
                Сортировка
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${sprite}#fi_chevron-down`}></use>
                </svg>
              </button>

              <div className={`nav-body-choose ${show1 && "active"}`}>
                <ul>
                  {[
                    { id: "price", text: "Дешевые" },
                    { id: "-price", text: "Дорогие" },
                    { id: "created_at", text: "Новые" },
                  ].map((item,index) => (
                    <div key={index}>
                      <label
                        htmlFor={item.text}
                        className={`labelcha ${
                          item.id === form.sort ? "active" : ""
                        }`}
                        style={{
                          padding: "0.9rem 0.8rem",
                        }}
                      >
                        {item.text}
                      </label>
                      <input
                        key={item.id}
                        type="text"
                        id={item.text}
                        name="sort"
                        onClick={(e) => {
                          changeHandler(e);
                          setShow1(false);
                        }}
                        value={item.id}
                        readOnly
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Slider
            {...settings}  
          >
            {objects.map((item, index) => (
              <div
                  key={index}
                onClick={() => {
                  if(item.object === form.building) {
                    return changeHandler({
                      target: {
                        name: "building",
                        value: ""
                      }
                    });
                  }
                  changeHandler({
                    target: {
                      name: "building",
                      value: item.object
                    }
                  })
                }}
              >
                <SliderItem 
                  key={index} 
                  style={{background: item.object === form.building && `#c56622`,
                  color: item.object === form.building && `#fff`, cursor: "pointer"}}
                >
                  <div 
                    className="slider-item"
                    
                  >
                    {item.object}
                  </div>
                </SliderItem>
              </div>
            ))}
          </Slider>
          <Houses value={form} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
