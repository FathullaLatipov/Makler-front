import { useMemo, useState } from "react";

import sprite from "../../assets/img/symbol/sprite.svg";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { useEffect } from "react";
import { baseURL } from "../../requests/requests";
import Loading from "../Loading/Loading";
import {useTranslation} from "react-i18next";

const Houses = ({ value, start, focus }) => {
  const { typeRoom, room, search, building, sort } = value;
  const [displayData, setDisplayData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [searchLimit, setSearchLimit] = useState(8);
  const [url, setUrl] = useState(
    `https://api.makleruz.uz/products/web/api/v1/all-web-houses/?limit=${limit}&offset=4`
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const { t } = useTranslation();


  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/products/web/api/v1/web-houses/search/?search=${search}`)
      .then((res) => setSearchData(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  const init = async () => {
    setLoading(true);

    const res = await axios.get(
      `https://api.makleruz.uz/products/web/api/v1/all-web-houses/`
    );

    setDisplayData(res.data.results);
    setLoading(false);
  };

  const init2 = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://api.makleruz.uz/products/web/api/v1/all-web-houses/?limit=${limit}&product_status=&object=${encodeURI(
        building
      )}&building_type=&number_of_rooms=${room}&type=${typeRoom}&rental_type=`
    );

    setDisplayData(res.data.results);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    
    setLoading(false);
  };
  const init3 = async () => {
    if (!sort) return;
    setLoading(true);
    const res = await axios.get(
      `https://api.makleruz.uz/products/web/api/v1/all-web-houses/?ordering=${sort}`
    );

    setDisplayData(res.data.results);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useMemo(() => {
    init2();
  }, [url, typeRoom, room, building, start]);

  useMemo(() => {
    init3();
  }, [sort]);

  useEffect(() => {
    if (displayData.length) {
      switch (sort) {
        case "price":
          displayData.sort((a, b) => a.price - b.price);
          break;
        case "-price":
          displayData.sort((a, b) => b.price - a.price);
          break;
        case "created_at":
          displayData.sort((a, b) => a.id - b.id);
          break;
        default:
          break;
      }
    }
  }, [sort]);

  const handleNext = () => {
    setUrl(nextUrl);
  };

  const handlePrev = () => {
    setUrl(prevUrl);
  };

  const handleLoad = () => {
    if (!search) {
      setLimit((prev) => (prev += 8));
    } else {
      setSearchLimit((prev) => (prev += 8));
    }
  };

  return (
    <section className="cards-s">
      <div className="container">
        <div className="cards">
          <div className="cards-head">
            <h4>{t("houses.recommendation")}</h4>
            <ul>
              <li>
                {" "}
                <div
                  style={{
                    width: "1rem",
                  }}
                >
                  {prevUrl && (
                    <a
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handlePrev}
                    >
                      <svg className="svg-sprite-icon icon-fi_chevron-left w-12">
                        <use href={`${sprite}#fi_chevron-left`}></use>
                      </svg>
                    </a>
                  )}
                </div>
              </li>
              <li>
                {" "}
                <div
                  style={{
                    width: "1rem",
                  }}
                >
                  {nextUrl && (
                    <a
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handleNext}
                    >
                      <svg className="svg-sprite-icon icon-fi_chevron-left w-12">
                        <use href={`${sprite}#fi_chevron-left`}></use>
                      </svg>
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>
          {!loading ? (
            <ul className="cards-list" id="houses-list">
              {!search.length ? (
                displayData.length ? (
                  displayData
                    ?.slice(0, limit)
                    ?.map((item) => item.product_status === 1 && <ProductCard key={item.id} data={item} />)
                ) : (
                  <h1>{t("houses.nothing")}</h1>
                )
              ) : searchData.length ? (
                searchData
                  ?.slice(0, searchLimit)
                  ?.map((item) => item.product_status === 1 && <ProductCard key={item.id} data={item} />)
              ) : (
                <h1>{t("houses.notfound")}</h1>
              )}
            </ul>
          ) : (
            <Loading />
          )}

          <button
            onClick={handleLoad}
            className="btn btn-big btn-white"
            id="show-more"
          >
            {t("houses.showmore")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Houses;
