const MsgType = ({ msgData }) => {
  const { type, textData } = msgData;
  return Array.isArray(textData) ? (
    <ul className="m-3">
      {textData.map((error, index) => (
        <li className="err-msg" key={`error-${index}`}>
          {error}
        </li>
      ))}
    </ul>
  ) : (
    <div className={type === "success" ? "succ-msg" : "err-msg"}>
      {textData}
    </div>
  );
};
export default MsgType;
