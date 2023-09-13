import axios from "axios";
import { useEffect, useState } from "react";
import sprite from "../../assets/img/symbol/sprite.svg";
import { LoadingPost } from "../../components";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

const SavedProduct = () => {
  const [saveProducts, setSaveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mount, setDeleteMount] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    window.document.title = t("navbar.favorites");
    axios
      .get(
        `https://api.makleruz.uz/products/api/v1/houses/get-wishlist-houses?user=${userid}`
      )
      .then((data) => setSaveProducts(data.data.results))
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  }, [mount]);


  return (
    <div className="content">
      {isLoading && <LoadingPost />}
      <section className="save-products-s">
        <div className="container">
          <div className="save-products">
            <ul className="cards-list">
              {saveProducts?.length ? (
                saveProducts.map((item, i) => (
                  <ProductCard
                    data={item.product}
                    wishId={item.id}
                    deleteMount={setDeleteMount}
                    key={i}
                    wishlist={true}
                  />
                ))
              ) : (
                <h1>В списке желаний пока нет товаров!</h1>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SavedProduct;
