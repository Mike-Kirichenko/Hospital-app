import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = ({ text, action }) => {
  const navigate = useNavigate();

  const exit = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <div id="logo">
        <img src="./../logo-pic.svg" alt="logo" className="resp-img" />
      </div>
      <h2 className="main-headings">{text}</h2>
      {action && (
        <button id="exit" onClick={exit}>
          Exit
        </button>
      )}
    </header>
  );
};

export default Header;
