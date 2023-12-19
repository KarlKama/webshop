import { createContext, useState } from 'react';

// tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext({ // näitab kõiki muudetavaid mida sellest contextist vaja
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
}); 

// index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }) { // children lisa et ülejäänud app tuleks ka läbi
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") === "123");

    const login = () => {
      setIsLoggedIn(true);
      sessionStorage.setItem("token", "123"); // kui tahta tokenit setida
    }

    const logout = () => {
      setIsLoggedIn(false);
      sessionStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, login, logout
            }}>
            { children }
        </AuthContext.Provider>
    )
}