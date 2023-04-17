import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let dis = true
  if(credential && password) {
    if(credential.length > 3 && password.length > 5) dis = false
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    };
  const handleDemo = (e) => {
    e.preventDefault();
    setErrors({});


    return dispatch(sessionActions.login({ credential:"demo@user.io", password:"password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    };



    return (
      <div className="loginModal">
      <h1>Log In</h1>
      {errors.credential && (
        <p className="errors">{errors.credential}</p>
      )}
      <form onSubmit={handleSubmit} className="inputArea">
        <label className="textBox">
          <div>
          Username or Email
          </div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="textBox">
          <div>
          Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label >
        <button type="submit" disabled={dis} className="loginButton" >Log In</button>
      </form>
      <form onSubmit={handleDemo}>
          <button className="loginDemo" type="submit">Log in as Demo User</button>
          </form>
    </div>
  );
}

export default LoginFormModal;
