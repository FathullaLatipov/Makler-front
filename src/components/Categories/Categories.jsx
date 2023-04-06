import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ContextApp from "../../context/context";
import { baseURL } from "../../requests/requests";
import "./Categories.scss";

const links = ["product", "master", "industria", "mebel"];

const Categories = () => {
  const { categories } = useContext(ContextApp);
  const [data, setData] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}/api/v1/categories/`)
  //     .then((res) => setData(res.data.results))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <section className="categories-s">
      <div className="container">
        <div className="categories">
          <ul id="categories-list" style={{}}>
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
    </section>
  );
};

export default Categories;
