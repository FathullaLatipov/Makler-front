import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ContextApp from "../../context/context";
import { useTranslation } from "react-i18next";

const links = ["product", "master", "industria", "mebel"];
const Categories = () => {
  const { categories } = useContext(ContextApp);
  const { t } = useTranslation();

  useEffect(() => {
    window.document.title = t("navbar.create");
  }, []);

  return (
    <section className="content">
      <div className="categories-s">
        <div>
          <div className="container">
            <div className="categories">
              <ul>
              {categories?.map((item, i) => (
                <li key={i}>
                  <span>
                    <Link to={`${links[i]}`}>
                        <div className="info">
                          <h2>{item.title}</h2>
                          <p>{item.subtitle}</p>
                        </div>
                        <div className="img">
                          <img src={item.image} alt={item.title} />
                        </div>
                    </Link>
                  </span>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
