import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import LoginRegisterForm from "../LoginRegisterForm";
import WithAuth from "../HOC/WithAuth";
import Visits from "../Visits";
import Api from "../../services/ApiService";
import ApiContext from "../../contexts/ApiContext";
import TokenContext from "../../contexts/TokenContext";
import "./app.css";

const api = new Api();

const App = () => {
  const [token, setToken] = useState(null);

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
                  <Header actionType="viewVisits" />
                  <Visits />
                </WithAuth>
              }
            />
            <Route
              path="/login"
              exact
              element={
                <>
                  <Header actionType="login" />
                  <LoginRegisterForm actionType="login" />
                </>
              }
            />
            <Route
              path="/register"
              exact
              element={
                <>
                  <Header actionType="register" />
                  <LoginRegisterForm actionType="register" />
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
