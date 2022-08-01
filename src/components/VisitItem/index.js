import moment from "moment";
import "./visitItem.css";

const VisitItem = ({ visitData, setItemToDeleteId, setItemToEdit }) => {
  const { id, patient_name, doctor, date, text } = visitData;
  const { name, specialty } = doctor;

  return (
    <>
      <tr>
        <td>{patient_name}</td>
        <td>
          {name} ({specialty})
        </td>
        <td>{moment(date).format("DD.MM.YYYY")}</td>
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
