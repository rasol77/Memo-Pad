import { createContext, useContext, useState } from 'react';

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenLocalStorage = (newToken) => {
    //El parametro newToken es un valor falso por JS se elimina el token
    //del LocalStorage, si no se crea.
    if (!newToken) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', newToken);
    }
    //Actualizamos la variable  TOKEN de State.
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={[token, setTokenLocalStorage]}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
