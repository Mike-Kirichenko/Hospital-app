import "./login-register-form.scss";
import { Link } from "react-router-dom";
const LoginRegisterForm = ({ actionType }) => {
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
          <form>
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
