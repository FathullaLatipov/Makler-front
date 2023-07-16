import { useContext, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import {useTranslation} from "react-i18next";
import { AppContext } from "../../store/AppStore";
import $host from "../../http";

const HomeHouses = () => {
  const [ { houses }, setStore ] = useContext(AppContext);
  const [limit, setLimit] = useState(8);
  const { t } = useTranslation();

  const init = async () => {
    const res = await $host.get(`https://api.makleruz.uz/products/web/api/v1/all-web-houses/?limit=${limit}`);
    setStore(prev => ({ ...prev, houses: { isLoading: false, list: res.data.results } }));
  };

  useEffect(() => {
    init()
  }, [limit]);


  const handleLoad = () => {
    setLimit((prev) => (prev += 8));
  };

  return (
    <section className="cards-s">
      <div className="container">
        <div className="cards">
          <div className="cards-head">
            <div className="cards-head-hd">
              <h4>{t("houses.recommendation")}</h4>
            </div>
          </div>
          {!houses.isLoading ? (
            <ul className="cards-list" id="houses-list">
              {houses.list.length ? (
                  houses.list?.map((item) => 
                    item.product_status === 1 && 
                      <ProductCard key={item.id} data={item} />
                    )
                ) : (
                  <h1>{t("houses.nothing")}</h1>
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

export default HomeHouses;