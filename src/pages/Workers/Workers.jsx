import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FilterWorker, UserCard } from "../../components";
import ContextApp from "../../context/context";
import useForm from "../../hooks/useForm";
import { baseURL } from "../../requests/requests";
import Loading from "../../components/Loading/Loading";

const Workers = () => {
  const { masters } = useContext(ContextApp);

  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLimit, setSearchLimit] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [limit, setLimit] = useState(6);
  const { form, changeHandler } = useForm({
    profession: "",
    search: "",
    service: "",
  });
  const { search, profession, service } = form;
  useEffect(() => {
    axios
      .get(`https://api.makleruz.uz//master/api/v1/maklers/`)
      .then((data) => setDisplayData(data.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useMemo(() => {
    setLoading(true);
    const params = {
      profession,
      how_service: service,
    };
    if (!profession) {
      delete params.profession;
    } else if (!service) {
      delete params.how_service;
    }
    axios
      .get(`https://api.makleruz.uz//master/api/v1/maklers/`, {
        params,
      })
      .then((data) => {
        setDisplayData(data.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [profession, service]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/master/api/v1/maklers/search/?search=${search}`)
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
        <div>
          <FilterWorker change={changeHandler} value={form} />
          <div className="app__cards--wrapper">
            {!loading ? (
              !search.length ? (
                displayData.length ? (
                  displayData?.slice(0, limit)?.map((data, i) => (
                    <div
                      key={i}
                      style={{
                        marginRight: "0.5rem",
                      }}
                    >
                      <UserCard data={data} />
                    </div>
                  ))
                ) : (
                  <h1>Ничего нет</h1>
                )
              ) : searchData.length ? (
                searchData?.slice(0, searchLimit)?.map((data, i) => (
                  <div
                    key={i}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  >
                    <UserCard data={data} />
                  </div>
                ))
              ) : (
                <h1>Предметы не найдены!</h1>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
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
    </section>
  );
};

export default Workers;
