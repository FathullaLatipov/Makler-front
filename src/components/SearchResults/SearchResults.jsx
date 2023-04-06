import { useState } from "react";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";

const SearchResults = ({ data, loading }) => {
  const [limit, setLimit] = useState(8);

  const handleClick = () => {};

  return (
    <div className="cards-s">
      <div className="container">
        <div className="cards">
          <div className="cards-head">Search results</div>
          <ul className="cards-list">
            {!loading ? (
              data?.length >= 8 ? (
                data
                  ?.slice(0, limit)
                  ?.map((item, i) => <ProductCard key={i} data={item} />)
              ) : (
                data?.map((item, i) => <ProductCard key={i} data={item} />)
              )
            ) : (
              <div
                style={{
                  height: "16rem",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: -100,
                }}
              >
                <Loading />
              </div>
            )}
          </ul>
          {data?.length > 8 ? (
            <button
              onClick={() => setLimit((prev) => prev + 8)}
              className="btn btn-big btn-white"
              id="show-more"
            >
              Показать ещё
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
