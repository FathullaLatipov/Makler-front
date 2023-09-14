import "./UserSingle.scss";
import { ProductSingle, SliderContent, UserCard } from "../../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";
import $host from "../../http";
import { useTranslation } from "react-i18next";
const UserSingle = ({ data, id }) => {
  const locat = useLocation();
  const [masterData, setMasterData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useLocation();
  const getData = (url, setData) => {
    setIsLoading(true);
    $host
      .get(`/${url}`)
      .then((res) => setData(res.data.results))
      .catch(() => {
        toast.error("Something went wrong while uploading recommends");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData("store2/api/v1/store/popular", setStoreData);
  }, [id]);

  useEffect(() => {
    getData("master/api/v1/maklers/popular", setMasterData);
  }, [id]);

  return (
    <>
      {data ? (
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
                    src={
                      "brand_image" in data ? data.brand_image : data?.avatar
                    }
                    alt="User image"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="user-info">
                    <h4 className="user-name">{data?.name}</h4>
                    <p className="user-level">
                      {"experience" in data
                        ? `Мастер, ${data.experience} года опыта`
                        : "use_for" in data
                        ? data.use_for?.title
                        : ""}
                    </p>
                  </div>
                  {"profession" in data && (
                    <div className="info-cards">
                      {data?.profession.map((item, i) => (
                        <span key={i} className="info-box">
                          {item.title}
                        </span>
                      ))}
                    </div>
                  )}
                  {"store_amenitites" in data && (
                    <div className="info-cards">
                      {data?.store_amenitites.map((item, i) => (
                        <span key={i} className="info-box">
                          {item.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="user-loc">
                    {typeof data.address !== "string"
                      ? data.address_title
                      : data.address}
                  </p>
                </div>
                <div className="app__worker-info--wrapper">
                  <div className="app__worker-info">
                    <h1>
                      {"phone" in data
                        ? data?.phone
                        : "phoneNumber" in data
                        ? data?.phoneNumber
                        : ""}
                    </h1>
                    <p>{data?.email}</p>
                  </div>
                  <a
                    href={`tel:${
                      "phone" in data
                        ? data.phone
                        : "phoneNumber" in data
                        ? data.phoneNumber
                        : ""
                    }`}
                    className="worker-btn"
                  >
                    {locat.pathname.includes("master")
                      ? "Позвонить по номеру"
                      : t("singleProduct.call")}
                  </a>
                </div>
              </div>
              <div className="app__worker-right">
                <h1>{t("singleProduct.description")}</h1>
                <p>
                  {"description" in data
                    ? data.description
                    : data?.descriptions}
                </p>
              </div>
            </div>
            {locat.pathname.includes("master") ? (
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
            ) : (
              ""
            )}

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
                ) : router.pathname.includes("industria") ? (
                  storeData
                    ?.filter((_, i) => i <= 3)
                    ?.map((item, i) => <ProductSingle key={i} data={item} />)
                ) : (
                  masterData
                    ?.filter((_, i) => i <= 3)
                    ?.map((item, i) => <UserCard key={i} data={item} />)
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default UserSingle;
