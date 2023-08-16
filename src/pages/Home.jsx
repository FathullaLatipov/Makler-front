import {useContext, useEffect} from "react";
import { useState } from "react";
import {
  BannerCarousel,
  BannerModal,
  Categories,
  DownloadApp,
  FooterMenu,
} from "../components";
import HomeHouses from "../components/HomeHouses/HomeHouses";
import {useSearchParams} from "react-router-dom";
import ContextApp from "../context/context";

const Home = () => {
  const [bannerModal, setBannerModal] = useState(false);
  const [query,] = useSearchParams();
  const { setFromUser } = useContext(ContextApp);

  const fetchData = () => {
    const modal = window.sessionStorage.getItem("modal");
    if (!modal) {
      setBannerModal(true);
    }
    window.document.title = "Главная";
    const from = query.get('from');
    setFromUser(from);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const closeModal = () => {
    setBannerModal(false);
    window.sessionStorage.setItem("modal", true);
  };

  return (
    <>
      {bannerModal && <BannerModal setOpen={closeModal}/>}
      <BannerCarousel />
      <Categories />
      <HomeHouses />
      <FooterMenu />
      <DownloadApp />
    </>
  );
};

export default Home;
