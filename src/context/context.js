import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequests } from "../requests/requests";

const ContextApp = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [userData, setUserData] = useState();
  const [homeHouses, setHomeHouses] = useState();
  const [houseData, setHouseData] = useState();
  const [userId, setUserId] = useState();

  const [carouselData, setCarouselData] = useState([]);

  const navigate = useNavigate();

  const loginModalFunc = (newState) => {
    setOpenLoginModal(newState);
  };
  const getUserData = (newState) => {
    setUserData(newState);
  };
  const getUserId = (newState) => {
    setUserId(newState);
  };
  const getHouseData = (newState) => {
    setHouseData(newState);
  };

  const homeHousesFilter = (newState) => {
    setHomeHouses(newState);
  };

  const navigateToProfile = () => {
    const userId = localStorage.getItem("userId");
    navigate(`/cabinet/${userId}`);
  };

  useEffect(() => {
    getRequests().then((data) => setData(data));
  }, []);

  return (
    <ContextApp.Provider
      value={{
        ...data,
        loginModalFunc,
        navigateToProfile,
        openLoginModal,
        userData,
        getUserData,
        getHouseData,
        getUserId,
        homeHousesFilter,
        homeHouses,
        houseData,
        userId,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default ContextApp;
