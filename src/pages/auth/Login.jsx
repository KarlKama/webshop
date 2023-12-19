import React, { useContext } from 'react'
import { AuthContext } from '../../store/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginAndNavigate = () => {
    login();
    navigate("/admin");
  }

  return (
    <div>
      <label>Email</label> <br />
      <input type="text"/> <br />
      <label>Password</label> <br />
      <input type="password"/> <br />
      <button onClick={loginAndNavigate}>Login</button>
    </div>
  )
}

export default Login