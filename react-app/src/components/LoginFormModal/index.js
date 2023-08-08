import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['The provided credentials were invalid']);
    } else {
        closeModal();
        return history.push("/home");
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      return history.push("/home");
    }
  };

  const marnieLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("marnie@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      return history.push("/home");
    }
  };

  const bobLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("bobbie@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
      return history.push("/home");
    }
  };

  return (
    <div className="login-form-container">
      <img
			alt="MindPalace"
			src="https://i.imgur.com/19eLshm.png"
			/>
      <h1>Log In</h1>
      <form
      onSubmit={handleSubmit}
      className="login-form"
      >
        <ul>
          {errors.map((error, idx) => (
            <li className="error" key={idx}>{error}</li>
          ))}
        </ul>
        <div>
            <input
              className="bg-black"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className="login-form-submit">
          <div>
            <button
            className="login-form-button curs"
            type="submit"
            disabled={email.length && password.length ? false : true}
            >Log In</button>
          </div>
          <div>
            <button className="login-form-button curs" onClick={demoLogin}>Demo User: Demo</button>
          </div>
          <div>
            <button className="login-form-button curs" onClick={marnieLogin}>Demo User: Marnie</button>
          </div>
          <div>
            <button className="login-form-button curs" onClick={bobLogin}>Demo User: Bobbie</button>
          </div>
        </div>
        <div className="login-form-no-account">
            <p>Don't have an account?</p>
            <button className="login-form-create-account-button curs">Create account</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
