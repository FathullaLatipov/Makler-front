import axios from "axios";
import { useMemo, useState } from "react";
import { useContext, useEffect } from "react";
import { FilterIndustria, ProductSingle } from "../../components";
import Loading from "../../components/Loading/Loading";
import ContextApp from "../../context/context";
import useForm from "../../hooks/useForm";
import { baseURL } from "../../requests/requests";

const AllIndustriya = () => {
  const { stores } = useContext(ContextApp);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [searchLimit, setSearchLimit] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const { form, changeHandler } = useForm({
    useFor: "",
    search: "",
    how_store_service: "",
    brand_title: "",
  });

  const { search, useFor, how_store_service, brand_title } = form;
  useEffect(() => {
    axios
      .get(`${baseURL}/store2/api/v1/store/`)
      .then((data) => setData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useMemo(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/store2/api/v1/store/`, {
        params: {
          use_for: useFor,
          how_store_service,
          brand_title,
        },
      })
      .then((data) => setData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [useFor, how_store_service, brand_title]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/store2/api/v1/store/search?search=${search}`)
      .then((res) => setSearchData(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  const handleLoad = () => {
    if (!search) {
      setLimit((prev) => (prev += 8));
    } else {
      setSearchLimit((prev) => (prev += 8));
    }
  };
  return (
    <section className="content">
      <div className="container">
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <FilterIndustria change={changeHandler} value={form} />
          {!loading ? (
            <div className="app__cards--wrapper">
              {!search.length ? (
                data.length ? (
                  data?.slice(0, limit)?.map((data) => (
                    <div
                      style={{
                        marginRight: "0.5rem",
                      }}
                      key={data.id}
                    >
                      <ProductSingle data={data} />
                    </div>
                  ))
                ) : (
                  <h1>Нет товаров.</h1>
                )
              ) : searchData.length ? (
                searchData?.slice(0, searchLimit)?.map((data, i) => (
                  <div
                    style={{
                      marginRight: "0.5rem",
                    }}
                    key={data.id}
                  >
                    <ProductSingle data={data} />
                  </div>
                ))
              ) : (
                <h1>Предметы не найдены!</h1>
              )}
            </div>
          ) : (
            <Loading />
          )}
          <button
            onClick={handleLoad}
            className="btn btn-big btn-white"
            id="show-more"
            style={{
              margin: "4rem auto",
            }}
          >
            Показать ещё
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllIndustriya;
