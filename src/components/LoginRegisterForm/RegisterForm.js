import { useState } from "react";
import { Link } from "react-router-dom";
import { validEmail, validPassword } from "../../helpers/validator";
import MsgType from "../MsgType";

import api from "../../services/ApiService";

import "./login-register-form.scss";

const RegisterForm = () => {
  const [msg, setMsg] = useState("");
  const [registerData, setData] = useState({
    login: "",
    password: "",
    re_password: "",
  });

  const setRegisterData = (inputObj) => {
    setData({ ...registerData, ...inputObj });
  };

  const { login, password, re_password } = registerData;

  const register = async () => {
    const errors = [];

    if (!validEmail(login)) {
      errors.push("Invalid email");
    }

    if (!validPassword(password)) {
      errors.push("Invalid password");
    }

    if (!errors.length) {
      if (password !== re_password) {
        setMsg({ type: "error", msgText: "Passwords must match" });
      } else {
        const dataObject = { email: login, password };
        try {
          const registered = await api.register(dataObject);
          if (registered) {
            setMsg({
              type: "success",
              msgText: "Registration is successful",
            });

            setData({
              login: "",
              password: "",
              re_password: "",
            });
          }
        } catch (err) {
          const { msg } = err.response.data;
          setMsg({ type: "error", msgText: msg });
        }
      }
    } else setMsg({ type: "error", msgText: errors });
  };

  const { type, msgText } = msg;

  return (
    <main>
      <div id="login-register">
        <div id="img-part">
          <img src="./auth-pic.svg" alt="auth-img" className="resp-img" />
        </div>
        <div id="form">
          <h5 className="main-headings">Register in the system</h5>
          {msgText && <MsgType msgData={{ type, textData: msgText }} />}
          <div className="form-inp-block">
            <label htmlFor="login">Login</label>
            <input
              name="login"
              type="email"
              id="login"
              placeholder="login"
              value={login}
              onChange={({ target }) =>
                setRegisterData({ login: target.value })
              }
            />
          </div>
          <div className="form-inp-block">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={({ target }) =>
                setRegisterData({ password: target.value })
              }
            />
          </div>
          <div className="form-inp-block">
            <label htmlFor="re-password">Retype Password</label>
            <input
              type="password"
              name="re_password"
              id="re-password"
              placeholder="********"
              value={re_password}
              onChange={({ target }) =>
                setRegisterData({ re_password: target.value })
              }
            />
          </div>
          <div className="form-inp-block form-buttons">
            <button id="form-button" type="submit" onClick={register}>
              Register
            </button>
          </div>
          <div className="form-inp-block form-buttons">
            <Link to="/login" className="no-decor">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
