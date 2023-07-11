import { useEffect } from "react";
import { useState } from "react";
import {
  BannerCarousel,
  BannerModal,
  Categories,
  DownloadApp,
  FooterMenu,
} from "../components";
import HomeHouses from "../components/HomeHouses/HomeHouses";

const Home = () => {
  const [bannerModal, setBannerModal] = useState(false);


  useEffect(() => {
    const modal = sessionStorage.getItem("modal");
    if (!modal) {
      setBannerModal(true);
    }

    return;
  }, []);
  
  const closeModal = () => {
    setBannerModal(false);
    sessionStorage.setItem("modal", true);
  };

  return (
    <>
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
