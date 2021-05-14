import React, { useState } from "react";

export const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState();
  const [showModal, setShowModal] = useState(false);
  return (
    <GlobalContext.Provider
      value={{ selectedContact, setSelectedContact, showModal, setShowModal }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
