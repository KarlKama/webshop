import React, {useContext, useState} from 'react'
import { AuthContext } from '../../store/AuthContext'
import AuthForm from '../../components/auth/AuthForm';

const Signup = () => {
  // FIREBASE guide: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

  const { saveAuthData, getUser } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

  const signupAndNavigate = (payload) => {

    fetch(url, {"method":"POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        if (json.error === undefined) {
          saveAuthData(json.idToken, json.refreshToken, json.expiresIn);
          getUser(true);
        } else {
          setMessage(json.error.message)
        }
      })
  }

  return (
    <div>
      <AuthForm
        message={message}
        buttonName="Sign-up"
        submitted={signupAndNavigate}  /* kui childist submittitakse siis käivitatakse parenti funkts */  
      />
    </div>
  )
}

export default Signup