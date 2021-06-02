import react, { createContext, useState } from "react";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthData] = useState({
    user: null,
    authenticated: false,
  });

  const [globalLoading, setGloabalLoading] = useState(true);

  const setAuth = (data) => {
    setAuthData(data);
  };

  const setLoad = (data) => {
    setGloabalLoading(data);
  };

  return (
    <authContext.Provider value={{ auth, setAuth, globalLoading, setLoad }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
