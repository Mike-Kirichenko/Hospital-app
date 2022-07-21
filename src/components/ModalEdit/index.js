import { useContext } from "react";
import DatePicker from "react-datepicker";
import MsgType from "../MsgType";
import { Modal, Button } from "react-bootstrap";
import DoctorsContext from "../../contexts/DoctorsContext";

const ModalEdit = ({
  setItemToEdit,
  handleUpdateVisit,
  editItem,
  errors,
  setErrors,
}) => {
  const setEditedVisitPartials = (visitFieldData) => {
    setItemToEdit({ ...editItem, ...visitFieldData });
  };

  const doctors = useContext(DoctorsContext);
  const { patient_name, text, date, doctor } = editItem;
  const { name: selectedDoctorName, id: selectedDoctorId } = doctor;
  const dateObj = new Date(date);
  const [day, month, year] = [
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate(),
    dateObj.getMonth() + 1 < 10
      ? `0${dateObj.getMonth() + 1}`
      : dateObj.getMonth() + 1,
    dateObj.getFullYear(),
  ];

  const cancelEdit = () => {
    setItemToEdit({});
    setErrors(false);
  };

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Edit visit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="patientName">Patient name</label>
          <input
            id="patientName"
            type="text"
            name="patient_name"
            placeholder="Patient name"
            className="w-100 p-2 my-2"
            value={patient_name}
            onInput={({ target }) =>
              setEditedVisitPartials({ patient_name: target.value })
            }
          />
        </div>
        <div>
          <div>
            <label htmlFor="doctorName">Doctor name</label>
          </div>
          <select
            className="w-100 p-2 my-2"
            id="doctorName"
            onChange={({ target }) =>
              setEditedVisitPartials({ doctor_id: parseInt(target.value) })
            }
          >
            <option value={selectedDoctorId}>
              ---{selectedDoctorName}----
            </option>
            {doctors.length &&
              doctors.map((doctor, index) => {
                const { name, id, specialty } = doctor;
                return (
                  <option key={`doctor-${index}`} value={id}>
                    {name} ({specialty})
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <DatePicker
            className="w-100 p-2 my-2"
            name="date"
            placeholderText="dd.mm.yyyy"
            id="date"
            dateFormat="dd.MM.yyyy"
            value={`${day}.${month}.${year}`}
            onChange={(date) => setEditedVisitPartials({ date })}
          />
        </div>
        <div>
          <label htmlFor="complaints">Complaints</label>
          <textarea
            type="text"
            name="text"
            placeholder="Write your complaints here"
            id="complaints"
            className="w-100 p-2 my-2"
            value={text}
            onInput={({ target }) =>
              setEditedVisitPartials({ text: target.value })
            }
          />
        </div>
        {errors.length > 0 && (
          <MsgType msgData={{ type: "error", textData: errors }} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelEdit}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleUpdateVisit()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalEdit;
