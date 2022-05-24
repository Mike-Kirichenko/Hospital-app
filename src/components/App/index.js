import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import LoginForm from "../LoginRegisterForm/LoginForm";
import RegisterForm from "../LoginRegisterForm/RegisterForm";
import WithAuth from "../HOC/WithAuth";
import Visits from "../Visits";
import Api from "../../services/ApiService";
import ApiContext from "../../contexts/ApiContext";
import TokenContext from "../../contexts/TokenContext";
import "./app.css";

const api = new Api();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ApiContext.Provider value={api}>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <WithAuth>
                  <Header text="Visits" actionType="viewVisits" />
                  <Visits />
                </WithAuth>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <>
                  <Header text="Enter the system" />
                  <LoginForm />
                </>
              }
            />
            <Route
              path="/register"
              exact
              element={
                <>
                  <Header text="Register in the system" />
                  <RegisterForm />
                </>
              }
            />
          </Routes>
        </Router>
      </ApiContext.Provider>
    </TokenContext.Provider>
  );
};

export default App;
