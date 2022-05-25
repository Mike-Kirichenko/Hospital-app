import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import RegisterForm from "../LoginRegisterForm/RegisterForm";
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
  );
};

export default App;
