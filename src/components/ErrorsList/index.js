const ErrorsList = ({ errors }) => {
  return Array.isArray(errors) ? (
    <ul className="m-3 err-msg">
      {errors.map((error, index) => (
        <li key={`err-${index}`}>{error}</li>
      ))}
    </ul>
  ) : (
    { errors }
  );
};
export default ErrorsList;
