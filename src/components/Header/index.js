import "./header.scss";

const Header = ({ text, actionType }) => {
  return (
    <header>
      <div id="logo">
        <img src="./../logo-pic.svg" alt="logo" className="resp-img" />
      </div>
      <h2 className="main-headings">{text}</h2>
      {actionType === "viewVisits" && <button id="exit">Exit</button>}
    </header>
  );
};

export default Header;
