import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";
import TokenContext from "../../contexts/TokenContext";
import "./login-register-form.scss";

const LoginForm = () => {
  const api = useContext(ApiContext);
  const { token, setToken } = useContext(TokenContext);
  const [errMsg, setErrMsg] = useState(null);

  if (token) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;
    const [login, password] = target;
    if (!login.value || !password.value) setErrMsg("All inputs required");
    else {
      const dataObject = { email: login.value, password: password.value };
      try {
        const loggedIn = await api.login(dataObject);
        if (loggedIn) {
          const { token } = loggedIn;
          setToken(token);
          localStorage.setItem("jwt", token);
          return <Navigate to="/" />;
        }
      } catch (err) {
        const { msg } = err.response.data;
        setErrMsg(msg);
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
          <h5 className="main-headings">Enter the system</h5>
          {errMsg && <div className="err-msg">{errMsg}</div>}
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
            <div className="form-inp-block form-buttons">
              <button id="form-button" type="submit">
                Enter
              </button>
            </div>
            <div className="form-inp-block form-buttons">
              <Link to="/register" className="no-decor">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
