import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppStore = ({ children }) => {
  const [ store, setStore ] = useState({
    carousel: {
      isLoading: true,
      list: [],
    },
    houses: {
      isLoading: true,
      list: [],
    }
  });

  return (
    <AppContext.Provider value={[ store, setStore ]}>
      { children }
    </AppContext.Provider>
  );
}

export default AppStore;