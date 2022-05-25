import "./visitItem.css";

const VisitItem = ({ patient_name, doctor_id, date, text }) => {
  const finalDate = new Date(date);
  const [day, month, year] = [
    finalDate.getDate() < 10 ? `0${finalDate.getDate()}` : finalDate.getDate(),
    finalDate.getMonth() < 10
      ? `0${finalDate.getMonth() + 1}`
      : finalDate.getMonth() + 1,
    finalDate.getFullYear(),
  ];

  return (
    <tr>
      <td>{patient_name}</td>
      <td>{doctor_id}</td>
      <td>{`${day}/${month}/${year}`}</td>
      <td>{text}</td>
    </tr>
  );
};

export default VisitItem;
