import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    url: "house",
    text: "Создание маклера",
    imgUrl: "https://api.makleruz.uz//media/category_image/cat1.svg",
  },
  {
    url: "industria",
    text: "Создание обустройства",
    imgUrl: "https://api.makleruz.uz//media/category_image/cat2.svg",
  },
  {
    url: "master",
    text: "Создание мастера",
    imgUrl: "https://api.makleruz.uz//media/category_image/cat3.svg",
  },
  {
    url: "mebel",
    text: "Мебель",
    imgUrl: "https://api.makleruz.uz//media/category_image/furniture.jpeg",
  },
];

const CreatePage = () => {
  return (
    <section className="content">
      <div className="categories-s">
        <div>
          <div className="container">
            <div className="categories">
              <ul>
                {categories?.map((item, i) => (
                  <li key={i}>
                    <Link to={`${item.url}`}>
                      <div className="info">
                        <h2>{item.text}</h2>
                        {/* <p>Более 1240 новых домов</p> */}
                      </div>
                      <div className="img">
                        <img src={item.imgUrl} alt={item.imgUrl} />
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

export default CreatePage;
