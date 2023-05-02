import axios from "axios";
import { useMemo, useState } from "react";
import { useContext, useEffect } from "react";
import { FilterIndustria, ProductSingle } from "../../components";
import Loading from "../../components/Loading/Loading";
import ContextApp from "../../context/context";
import useForm from "../../hooks/useForm";
import { baseURL } from "../../requests/requests";
import Slider from "react-slick";
import styled from "styled-components";

const   AllIndustriya = () => {
  const { stores } = useContext(ContextApp);
  const [ brands, setBrands ] = useState([]);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [searchLimit, setSearchLimit] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const { form, changeHandler } = useForm({
    useFor: "",
    search: "",
    how_store_service: "",
    brand_id: -1,
  });

  const { search, useFor, how_store_service, brand_id } = form;
  useEffect(() => {
    axios
      .get(`${baseURL}/store2/api/v1/store/`)
      .then((data) => setData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useMemo(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/store2/api/v1/store/`, {
        params: {
          use_for: useFor,
          how_store_service,
          brand_title: brand_id,
        },
      })
      .then((data) => setData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [useFor, how_store_service, brand_id]);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(`${baseURL}/store2/api/v1/store/search?search=${search}`);
    const brands = await axios.get(`${baseURL}/store2/api/v1/store/brands`);

    setBrands(brands.data.results);
    setSearchData(response.data.results)
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
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <FilterIndustria change={changeHandler} value={form} />
          <Slider
            {...settings}  
          >
            {brands.map((item, index) => (
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
                  style={{background: item.id === form.brand_id && `#c56622`,
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
                data.length ? (
                  data?.slice(0, limit)?.map((data) => data.product_status === 1 && (
                    <div
                      style={{
                        marginRight: "0.5rem",
                      }}
                      key={data.id}
                    >
                      <ProductSingle data={data} />
                    </div>
                  ))
                ) : (
                  <h1 style={{
                    marginTop: "100px"
                  }}>Нет товаров.</h1>
                )
              ) : searchData.length ? (
                searchData?.slice(0, searchLimit)?.map((data, i) => data.product_status === 1 && (
                  <div
                    style={{
                      marginRight: "0.5rem",
                    }}
                    key={data.id}
                  >
                    <ProductSingle data={data} />
                  </div>
                ))
              ) : (
                <h1>Предметы не найдены!</h1>
              )}
            </div>
          ) : (
            <Loading />
          )}
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
      </div>
    </section>
  );
};

export default AllIndustriya;
