import "./visitItem.css";

const VisitItem = ({ visitData, setItemToDeleteId, setItemToEdit }) => {
  const { id, patient_name, doctor, date, text } = visitData;
  const finalDate = new Date(date);
  const [day, month, year] = [
    finalDate.getDate() < 10 ? `0${finalDate.getDate()}` : finalDate.getDate(),
    finalDate.getMonth() + 1 < 10
      ? `0${finalDate.getMonth() + 1}`
      : finalDate.getMonth() + 1,
    finalDate.getFullYear(),
  ];

  const { name, specialty } = doctor;

  return (
    <>
      <tr>
        <td>{patient_name}</td>
        <td>
          {name} ({specialty})
        </td>
        <td>{`${day}.${month}.${year}`}</td>
        <td>{text}</td>
        <td colSpan="2">
          <i
            className="fa fa-trash-o edit-items"
            onClick={() => setItemToDeleteId(id)}
          />
          <i
            className="fa fa-pencil edit-items"
            onClick={() => setItemToEdit(visitData)}
          />
        </td>
      </tr>
    </>
  );
};

export default VisitItem;
