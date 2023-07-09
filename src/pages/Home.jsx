import { useEffect } from "react";
import { useState } from "react";
import {
  BannerCarousel,
  BannerModal,
  Categories,
  DownloadApp,
  FooterMenu,
  Houses,
} from "../components";
import useForm from "../hooks/useForm";
import HomeHouses from "../components/HomeHouses/HomeHouses";

const Home = () => {
  const [bannerModal, setBannerModal] = useState(false);

  // useEffect(() => {
  //  searchData?.splice(0, 8);
  // }, []);

  useEffect(() => {
    const modal = sessionStorage.getItem("modal");
    if (!modal) {
      setBannerModal(true);
    }

    return;
  }, []);
  
  // window.addEventListener("DOMContentLoaded", () => {
  //   setBannerModal(true);
  // });

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `${baseURL}/products/web/api/v1/web-houses/search/?search=${form.search}`
  //     )
  //     .then((res) => setSearchData(res.data.results))
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [form.search]);

  // console.log(form.search.length);

  const closeModal = () => {
    setBannerModal(false);
    sessionStorage.setItem("modal", true);
  };

  return (
    <>
      {/* <Filter
        value={form}
        change={changeHandler}
        start={setStart}
        setFocus={setFocus}
      /> */}
      {/* {form.search.length ? <SearchResults data={searchData} loading={loading} /> : ""} */}
      {bannerModal && <BannerModal setOpen={closeModal} />}
      <BannerCarousel />
      <Categories />
      <HomeHouses />
      <FooterMenu />
      <DownloadApp />
    </>
  );
};

export default Home;
