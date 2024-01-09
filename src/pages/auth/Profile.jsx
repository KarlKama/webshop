import React, {useContext, useRef, useState} from 'react'
import { AuthContext } from '../../store/AuthContext'

const Profile = () => {

    const { getUser, loggedInUser } = useContext(AuthContext);
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

    const photoRef = useRef();
    const displayNameRef = useRef();
    const [message, setMessage] = useState("");

    const updateProfile = () => {

        const payload = {
            "idToken": sessionStorage.getItem("token"),
            "displayName": displayNameRef.current.value,
            "photoUrl": photoRef.current.value,
            "deleteAttribute": [],
            "returnSecureToken": false
        }
      
        fetch(url, {"method":"POST", "body": JSON.stringify(payload)})
        .then(res => res.json())
        .then(json => {
            if (json.error === undefined) {
                //saveAuthData(json.idToken, json.refreshToken, json.expiresIn); //ei uuenda tokenit seekord
                getUser();
                setMessage("Edukalt uuendatud!")
            } else {
                setMessage(json.error.message)
            }
        })

    }

    // kui tahan funktsiooni KOHE lehele tulles välja kutsuda:
    // <div>{startSomething()}</div>
    // onClick={startSomething()} <--- ei tee

    // onClick={clickToStart}
    // onClick={() => clickToStart(product)}

  return (
    <div>
      <div>{message}</div>
      <label>Photo</label> <br />
      <input ref={photoRef} defaultValue={loggedInUser.photoUrl} type="text"/> <br />
      <label>Display name</label> <br />
      <input ref={displayNameRef} defaultValue={loggedInUser.displayName} type="text"/> <br />
      <button onClick={updateProfile}>Login</button>
    </div>
  )
}

export default Profile