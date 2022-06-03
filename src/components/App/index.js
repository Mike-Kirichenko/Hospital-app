import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import RegisterForm from "../LoginRegisterForm/RegisterForm";
import LoginForm from "../LoginRegisterForm/LoginForm";
import WithAuth from "../HOC/WithAuth";
import Visits from "../Visits";
import Api from "../../services/ApiService";
import ApiContext from "../../contexts/ApiContext";
import "./app.css";

const api = new Api("http://localhost:3000/api/hospital");

const App = () => {
  return (
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
            path="/register"
            exact
            element={
              <>
                <Header text="Register in the system" />
                <RegisterForm />
              </>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <>
                <Header text="Login to system" />
                <LoginForm />
              </>
            }
          />
        </Routes>
      </Router>
    </ApiContext.Provider>
  );
};

export default App;
