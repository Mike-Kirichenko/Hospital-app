import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import RegisterForm from "../LoginRegisterForm/RegisterForm";
import LoginForm from "../LoginRegisterForm/LoginForm";
import WithAuth from "../HOC/WithAuth";
import Visits from "../Visits";
import "./app.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <WithAuth>
              <Header text="Visits" action />
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
  );
};

export default App;
