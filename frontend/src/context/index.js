import React, { useState } from "react";

export const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState();
  return (
    <GlobalContext.Provider value={{ selectedContact, setSelectedContact }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
