import "./header.scss";
const Header = ({ actionType }) => {
  return (
    <header>
      <div id="logo">
        <img src="./../logo-pic.svg" alt="logo" className="resp-img" />
      </div>
      {actionType === "login" && (
        <>
          <h2 className="main-headings">Enter the system</h2>
        </>
      )}

      {actionType === "viewVisits" && (
        <>
          <h2 className="main-headings">Visits</h2>
          <button id="exit">Exit</button>
        </>
      )}

      {actionType === "register" && (
        <h2 className="main-headings">Register in the system</h2>
      )}
    </header>
  );
};

export default Header;
