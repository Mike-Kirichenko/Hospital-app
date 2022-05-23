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
  );
};

export default App;
