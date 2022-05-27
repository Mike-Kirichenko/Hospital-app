import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { validEmail, validPassword } from "../../helpers/validator";
import ApiContext from "../../contexts/ApiContext";

import "./login-register-form.scss";

const RegisterForm = () => {
  const api = useContext(ApiContext);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;
    const [login, password, re_password] = target;

    if (!login.value || !password.value || !re_password.value) {
      setMsg({ type: "error", msgText: "All inputs required" });
    } else {
      const errors = [];
      if (!validEmail(login.value)) {
        errors.push("Invalid email");
      }
      if (!validPassword(password.value)) {
        errors.push("Invalid password");
      }

      if (!errors.length) {
        if (password.value !== re_password.value) {
          setMsg({ type: "error", msgText: "Passwords must match" });
        } else {
          const dataObject = { email: login.value, password: password.value };
          try {
            const registered = await api.register(dataObject);
            if (registered) {
              setMsg({
                type: "success",
                msgText: "Registration is successful",
              });
              target.reset();
            }
          } catch (err) {
            const { msg } = err.response.data;
            setMsg({ type: "error", msgText: msg });
          }
        }
      } else setMsg({ type: "error", msgText: errors });
    }
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
          {msgText &&
            (Array.isArray(msgText) ? (
              msgText.map((error, index) => (
                <div className="err-msg" key={`error-${index}`}>
                  {error}
                </div>
              ))
            ) : (
              <div className={type === "success" ? "succ-msg" : "err-msg"}>
                {msgText}
              </div>
            ))}
          <form onSubmit={handleSubmit}>
            <div className="form-inp-block">
              <label htmlFor="login">Login</label>
              <input name="login" type="email" id="login" placeholder="login" />
            </div>
            <div className="form-inp-block">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </div>
            <div className="form-inp-block">
              <label htmlFor="re-password">Retype Password</label>
              <input
                type="password"
                name="re_password"
                id="re-password"
                placeholder="********"
              />
            </div>
            <div className="form-inp-block form-buttons">
              <button id="form-button" type="submit">
                Register
              </button>
            </div>
            <div className="form-inp-block form-buttons">
              <Link to="/login" className="no-decor">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
