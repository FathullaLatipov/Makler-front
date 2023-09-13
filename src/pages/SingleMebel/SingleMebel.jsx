// import "./UserSingle.scss";
import {
  LoadingPost,
  ProductSingle,
  SliderContent,
  UserCard,
} from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../requests/requests";
import Loading from "../../components/Loading/Loading";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SingleMebel = () => {
  const locat = useLocation();
  const [recomendData, setRecomendedData] = useState([]);
  const [loading, setLaoding] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${baseURL}/mebel/api/v1/mebels/${id}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLaoding(false));
  }, [id]);

  useEffect(() => {
    setLaoding(true);
    axios
      .get(`${baseURL}/mebel/api/v1/mebels/popular`)
      .then((data) => setRecomendedData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLaoding(false));
  }, [id]);

  return (
    <div className="content">
      {!loading ? (
        <section
          className="content"
          style={{
            padding: "2rem 0",
          }}
        >
          <div className="container">
            <div className="app__worker-wrapper">
              <div className="app__worker-left">
                <div className="user-card">
                  <img
                    src={data?.images && data.images[0].images}
                    alt="User image"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="user-info">
                    <h4 className="user-name">{data?.title}</h4>
                    <p className="user-level">{data?.short_descriptions}</p>
                  </div>
                  <div className="info-cards">
                    <span className="info-box">{data?.category?.title}</span>
                  </div>
                  <p className="user-loc">{data?.web_address_title}</p>
                </div>
                <div className="app__worker-info--wrapper">
                  <div className="app__worker-info">
                    <h1>{data?.phone_number}</h1>
                  </div>
                  <a href={`tel:${data?.phone_number}`} className="worker-btn">
                    Позвонить по номеру
                  </a>
                </div>
              </div>
              <div className="app__worker-right">
                <h1>{t("singleProduct.description")}</h1>
                <p>{data?.long_descriptions}</p>
              </div>
            </div>
            <section
              className="slider-s"
              style={{
                margin: "1.5rem 0",
              }}
            >
              <div className="container">
                <div className="slider-body">
                  <div
                    className="slider__left"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div className="swiper">
                      {data?.images?.length && (
                        <SliderContent imgUrl={data?.images} />
                      )}
                    </div>
                  </div>
                  <div className="slider__right">
                    <ul>
                      {data?.images?.length &&
                        data?.images
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

            <div
              className=""
              style={{
                marginTop: "4rem",
              }}
            >
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Рекомендуем похожие
              </h1>
              <div
                className="workers-group"
                style={{
                  minHeight: "450px",
                }}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  recomendData
                    ?.filter((_, i) => i <= 3)
                    ?.map((item, i) => <UserCard key={i} data={item} mebel />)
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LoadingPost />
      )}
    </div>
  );
};

export default SingleMebel;
