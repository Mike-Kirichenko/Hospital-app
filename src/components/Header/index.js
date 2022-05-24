import { useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import "./header.scss";

const Header = ({ text, actionType }) => {
  const { setToken } = useContext(TokenContext);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
  };

  return (
    <header>
      <div id="logo">
        <img src="./../logo-pic.svg" alt="logo" className="resp-img" />
      </div>
      <h2 className="main-headings">{text}</h2>
      {actionType === "viewVisits" && (
        <button id="exit" onClick={logout}>
          Exit
        </button>
      )}
    </header>
  );
};

export default Header;
