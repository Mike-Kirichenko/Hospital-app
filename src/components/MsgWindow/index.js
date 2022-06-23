import { Alert } from "react-bootstrap";
export const MsgWindow = ({ msg, setMsg }) => {
  const { type, text } = msg;

  return (
    <Alert
      variant={(type === "err" && "danger") || (type === "succ" && "success")}
      onClose={() => setMsg("")}
      dismissible
      className="position-absolute top-0 left-0"
    >
      {Array.isArray(text) ? (
        <ul className="p-2">
          {text.map((error, index) => (
            <li key={`validation-${index}`}>{error}</li>
          ))}
        </ul>
      ) : (
        text
      )}
    </Alert>
  );
};
