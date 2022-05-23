import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import LoginRegisterForm from "../LoginRegisterForm";
import "./app.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <>
              <Header text="Enter the system" />
              <LoginRegisterForm actionType="login" />
            </>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <>
              <Header text="Register in the system" />
              <LoginRegisterForm actionType="register" />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
