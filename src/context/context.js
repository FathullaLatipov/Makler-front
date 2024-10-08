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
  const [favorites, setFavorites] = useState([]);
  const [refferals, setRefferals] = useState([]);
  const [fromUser, setFromUser] = useState(null);

  const navigate = useNavigate();

  const loginModalFunc = (newState) => {
    setOpenLoginModal(newState);
  };
  const addUserData = (newState) => {
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
        favorites,
        setFavorites,
        loginModalFunc,
        navigateToProfile,
        openLoginModal,
        userData,
        addUserData,
        getHouseData,
        getUserId,
        homeHousesFilter,
        homeHouses,
        houseData,
        userId,
        refferals,
        setRefferals,
        fromUser,
        setFromUser,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

export default ContextApp;
