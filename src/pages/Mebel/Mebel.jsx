import React, { useContext, useEffect, useMemo, useState } from "react";
import { FilterMebel, FilterWorker, UserCard } from "../../components";
import useForm from "../../hooks/useForm";
import Loading from "../../components/Loading/Loading";
import Slider from "react-slick";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import $host from "../../http";

const Mebel = () => {
  const [ categories, setCategories ] = useState([]);
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchLimit, setSearchLimit] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [limit, setLimit] = useState(6);
  const { t } = useTranslation();
  const { form, changeHandler } = useForm({
    // profession: "",
    search: "",
    category: "",
  });
  const { search, category, service } = form;
  useEffect(() => {
    $host
      .get("mebel/api/v1/mebels/", {
        params: {
          category,
        },
      })
      .then((data) => setDisplayData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [category]);

  const fetchData = async () => {
    setLoading(true);
    const response = await $host.get(`mebel/api/v1/mebels/?search=${search}`)
    const categories = await $host.get(`mebel/api/v1/mebel-categories/`);
    setSearchData(response.data.results);
    setCategories(categories.data.results);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  // useMemo(() => {
  //   setLoading(true);
  //   const params = {
  //     profession,
  //     how_service: service,
  //   };
  //   if (!profession) {
  //     delete params.profession;
  //   } else if (!service) {
  //     delete params.how_service;
  //   }
  //   axios
  //     .get(`https://api.makleruz.uz//mebel/api/v1/mebels/`, {
  //       params,
  //     })
  //     .then((data) => {
  //       setDisplayData(data.data.results);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, [profession, service]);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${baseURL}/master/api/v1/maklers/search/?search=${search}`)
  //     .then((res) => setSearchData(res.data.results))
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [search]);

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
          <FilterMebel change={changeHandler} value={form} />
          <Slider
            {...settings}  
          >
            {categories.map((item, index) => (
              <div
                onClick={() => {
                  if(item.id === form.brand_id) {
                    return changeHandler({
                      target: {
                        name: "brand_id",
                        value: -1
                      }
                    });
                  }
                  changeHandler({
                    target: {
                      name: "brand_id",
                      value: item.id
                    }
                  })
                }}
              >
                <SliderItem 
                  key={index} 
                  style={{background: item.id === form.brand_id && `rgba(238,125,62,255)`,
                  color: item.id === form.brand_id && `#fff`}}
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
          {!loading ? (
            <div className="app__cards--wrapper">
              {!search.length ? (
                displayData?.length ? (
                  displayData?.slice(0, limit)?.map((data) => data.product_status === 1 && (
                    <div
                      style={{
                        marginRight: "0.5rem",
                      }}
                      key={data.id}
                    >
                      <UserCard data={data} mebel />
                    </div>
                  ))
                ) : (
                  <h1 style={{
                    marginTop: "100px"
                  }}>Нет товаров.</h1>
                )
              ) : searchData.length ? (
                searchData?.slice(0, searchLimit)?.map((data) => data.product_status === 1 && (
                  <div
                    style={{
                      marginRight: "0.5rem",
                    }}
                    key={data.id}
                  >
                    <UserCard data={data} mebel />
                  </div>
                ))
              ) : (
                <h1>Предметы не найдены!</h1>
              )}
            </div>
          ) : (
            <Loading />
          )}
          {/* <div className="app__cards--wrapper">
            {!loading ? (
              displayData.length ? (
                displayData?.slice(0, limit)?.map((data, i) => (
                  <div
                    key={i}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  >
                    <UserCard data={data} mebel />
                  </div>
                ))
              ) : (
                <h1>Ничего нет</h1>
              )
            ) : (
              <Loading />
            )}
          </div> */}
        </div>
        <button
          onClick={handleLoad}
          className="btn btn-big btn-white"
          id="show-more"
          style={{
            margin: "4rem auto",
          }}
        >
          {t("houses.showmore")}
        </button>
      </div>
    </section>
  );
};

export default Mebel;
