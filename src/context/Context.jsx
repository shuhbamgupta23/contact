import { createContext, useContext, useState } from "react";

const ContactContext = createContext();

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [update, setUpdate] = useState(null);
  return (
    <ContactContext.Provider value={{ update, setUpdate }}>
      {children}
    </ContactContext.Provider>
  );
};

export default Context;

export const ContactContextShare = () => useContext(ContactContext);
