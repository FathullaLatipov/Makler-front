import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FilterWorker, UserCard } from "../../components";
import useForm from "../../hooks/useForm";
import { baseURL } from "../../requests/requests";
import Loading from "../../components/Loading/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const Workers = () => {
  const [ masters, setMasters ] = useState([]);
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLimit, setSearchLimit] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [limit, setLimit] = useState(6);
  const { form, changeHandler } = useForm({
    profession: -1,
    search: "",
    service: "",
  });
  const { search, profession, service } = form;
  useEffect(() => {
    axios
      .get(`https://api.makleruz.uz/master/api/v1/maklers/`)
      .then((data) => setDisplayData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useMemo(() => {
    setLoading(true);
    const params = {
      profession,
      how_service: service,
    };
    if (!profession) {
      delete params.profession;
    } else if (!service) {
      delete params.how_service;
    }
    axios
      .get(`https://api.makleruz.uz/master/api/v1/maklers/`, {
        params,
      })
      .then((data) => {
        setDisplayData(data.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [profession, service]);

  const fetchData = async () => {
    setLoading(true);
    const masters = await axios.get(`${baseURL}/master/api/v1/maklers/professions`);
    const response = await axios.get(`${baseURL}/master/api/v1/maklers/search/?search=${search}`)
    let result = masters.data.results;
    if(result.length > 0) {
      while(result.length < 6) {
        result = result.concat(result);
      }
    }
    setMasters(result);
    setSearchData(response.data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleLoad = () => {
    if (!search) {
      setLimit((prev) => (prev += 8));
    } else {
      setSearchLimit((prev) => (prev += 8));
    }
  };

  const settings = {
    infinite: true,
    dots: false,
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
  }


  const SliderItem = styled.div`
    background: #ffffff;
    width: 95% !important;
    border-radius: 30px;
    padding: 20px;
    text-align: center;
    margin: 0 10px;
    font-size: 15px;
  `

  return (
    <section className="content">
      <div className="container">
        <div>
          <FilterWorker change={changeHandler} value={form} />
          <Slider
            {...settings}  
          >
            {masters.map((item, index) => (
              <div
                onClick={() => {
                  if(item.id === form.profession) {
                    return changeHandler({
                      target: {
                        name: "profession",
                        value: -1
                      }
                    });
                  }
                  changeHandler({
                    target: {
                      name: "profession",
                      value: item.id
                    }
                  })
                }}
              >
                <SliderItem 
                  key={index} 
                  style={{background: item.id === form.profession && `rgba(238,125,62,255)`,
                  color: item.id === form.profession && `#fff`}}
                >
                  <div 
                    className="slider-item"
                    
                  >
                    {item.title}
                  </div>
                </SliderItem>
              </div>
            ))}
          </Slider>
          <div className="app__cards--wrapper">
          {!loading ? (
              !search.length ? (
                displayData.length ? (
                  displayData?.slice(0, limit)?.map((data, i) => (
                      data.product_status === 1 && 
                        <div
                          key={i}
                          style={{
                            marginRight: "0.5rem",
                          }}
                        >
                          <UserCard data={data} />
                        </div>
                  ))
                ) : (
                  <h1 style={{
                    marginTop: "100px"
                  }}>Ничего нет</h1>
                )
              ) : searchData.length ? (
                searchData?.slice(0, searchLimit)?.map((data, i) => (
                    data.product_status === 1 && 
                      <div
                        key={i}
                        style={{
                          marginRight: "0.5rem",
                        }}
                      >
                        <UserCard data={data} />
                      </div>
                ))
              ) : (
                <h1>Предметы не найдены!</h1>
              )
            ) : (
              <Loading />
        )}
          </div>
        </div>
        <button
          onClick={handleLoad}
          className="btn btn-big btn-white"
          id="show-more"
          style={{
            margin: "4rem auto",
          }}
        >
          Показать ещё
        </button>
      </div>
    </section>
  );
};

export default Workers;
