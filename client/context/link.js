import React, { createContext, useState } from "react";

export const LinkContext = createContext();

const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  
  return (
    <LinkContext.Provider value={[links, setLinks]}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkProvider;
