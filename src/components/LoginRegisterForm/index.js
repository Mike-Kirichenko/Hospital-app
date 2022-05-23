import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";
import "./login-register-form.scss";

const LoginRegisterForm = ({ actionType, onSetToken }) => {
  const { register, login } = useContext(ApiContext);

  const [error, setError] = useState(false);

  const handleSubmit = (event, actionType) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dataObject = {};

    if (actionType === "login") {
      for (const pair of formData.entries()) {
        const [key, value] = pair;
        if (!value) {
          setError(true);
          break;
        }
        dataObject[key] = value;
      }
    }
  };

  return (
    <main>
      <div id="login-register">
        <div id="img-part">
          <img src="./auth-pic.svg" alt="auth-img" className="resp-img" />
        </div>
        <div id="form">
          {actionType === "login" && (
            <h5 className="main-headings">Enter the system</h5>
          )}
          {actionType === "register" && (
            <h5 className="main-headings">Register in the system</h5>
          )}

          {error && actionType === "login" && (
            <div className="err-msg">Invalid Credentials</div>
          )}

          <form onSubmit={(event) => handleSubmit(event, actionType)}>
            <div className="form-inp-block">
              <label htmlFor="login">Login</label>
              <input name="login" id="login" placeholder="login" />
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
            {actionType === "register" && (
              <div className="form-inp-block">
                <label htmlFor="re-password">Retype Password</label>
                <input
                  type="password"
                  name="re-password"
                  id="re-password"
                  placeholder="********"
                />
              </div>
            )}
            <div className="form-inp-block form-buttons">
              <button id="form-button" type="submit">
                {actionType === "register" ? "Register" : "Enter"}
              </button>
            </div>
            <div className="form-inp-block form-buttons">
              <Link
                to={`/${actionType === "register" ? "login" : "register"}`}
                className="no-decor"
              >
                {actionType === "register" ? "Login" : "Registration"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginRegisterForm;
