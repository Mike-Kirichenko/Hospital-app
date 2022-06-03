import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = ({ text, actionType }) => {
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
      {actionType === "viewVisits" && (
        <button id="exit" onClick={exit}>
          Exit
        </button>
      )}
    </header>
  );
};

export default Header;
