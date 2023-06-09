import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import ContextApp from "../../context/context";

const links = ["product", "master", "industria", "mebel"];

// const categories = [
//   {
//     url: "house",
//     text: "Создание маклера",
//     imgUrl: "https://api.makleruz.uz/media/category_image/cat1.svg",
//   },
//   {
//     url: "industria",
//     text: "Создание обустройства",
//     imgUrl: "https://api.makleruz.uz/media/category_image/cat2.svg",
//   },
//   {
//     url: "master",
//     text: "Создание мастера",
//     imgUrl: "https://api.makleruz.uz/media/category_image/cat3.svg",
//   },
//   {
//     url: "mebel",
//     text: "Мебель",
//     imgUrl: "https://api.makleruz.uz/media/category_image/furniture.jpeg",
//   },
// ];
const Categories = () => {
  const { categories } = useContext(ContextApp);
  const [data, setData] = useState();

  return (
    <section className="content">
      <div className="categories-s">
        <div>
          <div className="container">
            <div className="categories">
              <ul>
              {categories?.map((item, i) => (
              <li key={i}>
                <Link to={`${links[i]}`}>
                  <div className="info">
                    <h2>{item.title}</h2>
                    <p>{item.subtitle}</p>
                  </div>
                  <div className="img">
                    <img src={item.image} alt={item.title} />
                  </div>
                </Link>
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
