import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext({ // näitab kõiki muudetavaid mida sellest contextist vaja
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
}); 

// index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }) { // children lisa et ülejäänud app tuleks ka läbi
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setloggedInUser] = useState(null);
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

    useEffect(() => {
      const isOk = validateAuthData();
      if (isOk) {
        getUser(false);
      }
    }, [url])

    const validateAuthData = () => {
      if (sessionStorage.getItem("expiresIn") === null ||
          sessionStorage.getItem("refreshToken") === null ) {
            logout();
            return false;
          }

      if (true || Date.now() > Number(sessionStorage.getItem("expiresIn"))) { // panna true siis uuendab iga refreshiga
        //await
        updateIdToken();
      }

      if (sessionStorage.getItem("token") === null ) {
        logout();
        return false;
      }
      
      return true;
    }

    const navigate = useNavigate();

    const getUser = (isNavigated) => {
      
      const payload = {
        "idToken": sessionStorage.getItem("token")
      }

      // siia fetchi ilma ülemise awaitita läheks korraga tegema
      fetch(url, {"method":"POST", "body": JSON.stringify(payload)})
        .then(res => res.json())
        .then(json => {
          if (json.error === undefined) {
            setloggedInUser(json.users[0]);
            setIsLoggedIn(true);
            checkLogin(); // kontrollib kas token on kehtiv
            if (isNavigated) {
              navigate("/admin")
            }
          } else {
            logout();
          }
        })
    }

    const refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

    const updateIdToken = async () => {
      
      const payload = {
        "refresh_token": sessionStorage.getItem("refreshToken"),
        "grant_type": "refresh_token"
      }

      // fetch on alati async 
      await fetch(refreshTokenUrl, { //await sest siis ta jõuab uue tokeni pärida, muidu kasutab vana tokenit
        "method": "POST",
         "body": JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(json => {
        if (json.error) { // clearib kui refresh tokenit saades on error
          logout(); 
          return;
        }
        saveAuthData(json.id_token, json.refresh_token, json.expires_in)
      })

    } 

    const saveAuthData = (idToken, refreshToken, expiresIn) => {
      let millisecondsNow = Date.now();
      millisecondsNow += Number(expiresIn) * 1000;
      sessionStorage.setItem("expiresIn", millisecondsNow);
      sessionStorage.setItem("token", idToken); // kui tahta tokenit setida
      sessionStorage.setItem("refreshToken", refreshToken);
    }

    const logout = () => {
      setIsLoggedIn(false);
      setloggedInUser(null);
      sessionStorage.clear();// kustutab kõik ära
    }

    const [isLogoutModal, setLogoutModal] = useState(false);

    let checkLoginId;
    const checkLogin = () => {

      console.log(new Date(Number(sessionStorage.getItem("expiresIn"))))

      if (checkLoginId) {
        clearTimeout(checkLoginId);
      }
      if( Date.now() > Number(sessionStorage.getItem("expiresIn"))) {
          logout();
          setLogoutModal(true);
      } else {
        checkLoginId = setTimeout(checkLogin,1000);
      }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, saveAuthData, logout, loggedInUser, getUser, isLogoutModal
            }}>
            { children }
        </AuthContext.Provider>
    )
}