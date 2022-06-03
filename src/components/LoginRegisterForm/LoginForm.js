import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../contexts/ApiContext";
import "./login-register-form.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const api = useContext(ApiContext);
  const [errMsg, setErrMsg] = useState(null);

  const [fullLoginData, setLoginData] = useState({ email: "", password: "" });

  const setFullLoginData = (inputObj) => {
    setLoginData({ ...fullLoginData, ...inputObj });
  };

  const actionLogin = async () => {
    try {
      const { email, password } = fullLoginData;
      if (!email || !password) setErrMsg("Enter your credentials");
      else {
        const loggedIn = await api.login(fullLoginData);
        if (loggedIn) navigate("/");
      }
    } catch (err) {
      const { msg } = err.response.data;
      setErrMsg(msg);
    }
  };

  const { email, password } = fullLoginData;

  return (
    <main>
      <div id="login-register">
        <div id="img-part">
          <img src="./auth-pic.svg" alt="auth-img" className="resp-img" />
        </div>
        <div id="form">
          <h5 className="main-headings">Enter the system</h5>
          {errMsg && <div className="err-msg">{errMsg}</div>}
          <div className="form-inp-block">
            <label htmlFor="login">Login</label>
            <input
              name="login"
              type="email"
              id="login"
              value={email}
              placeholder="login"
              onInput={({ target }) =>
                setFullLoginData({ email: target.value })
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
              onInput={({ target }) =>
                setFullLoginData({ password: target.value })
              }
            />
          </div>
          <div className="form-inp-block form-buttons">
            <button id="form-button" onClick={actionLogin}>
              Enter
            </button>
          </div>
          <div className="form-inp-block form-buttons">
            <Link to="/register" className="no-decor">
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
