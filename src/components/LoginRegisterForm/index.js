import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";
import TokenContext from "../../contexts/ApiContext";
import "./login-register-form.scss";

const LoginRegisterForm = ({ actionType, onSetToken }) => {
  const api = useContext(ApiContext);
  const token = useContext(TokenContext);
  const [errorMsg, setErrorMsg] = useState(null);

  if (token) return <Navigate to="/" />;

  const handleSubmit = async (event, actionType) => {
    event.preventDefault();

    if (actionType === "login") {
      const login = event.target[0].value;
      const password = event.target[1].value;
      if (!login || !password) setErrorMsg("All inputs required");
      else {
        const dataObject = { email: login, password };

        try {
          const loggedIn = await api.login(dataObject);
          if (loggedIn) {
            const { token } = loggedIn;
            onSetToken(token);
            return <Navigate to="/" />;
          }
        } catch (err) {
          const { msg } = err.response.data;
          setErrorMsg(msg);
        }
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

          {errorMsg && actionType === "login" && (
            <div className="err-msg">{errorMsg}</div>
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
