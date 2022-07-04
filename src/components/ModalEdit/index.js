import { useContext } from "react";
import DatePicker from "react-datepicker";
import { Modal, Button } from "react-bootstrap";
import DoctorsContext from "../../contexts/DoctorsContext";

const ModalEdit = ({
  setItemToEdit,
  updateVisit,
  editItem,
  errors,
  setErrors,
}) => {
  const setEditedVisitPartials = (visitFieldData) => {
    setItemToEdit({ ...editItem, ...visitFieldData });
  };

  const doctors = useContext(DoctorsContext);
  let { patient_name, text, date, doctor } = editItem;
  const { name: selectedDoctorName, id: selectedDoctorId } = doctor;
  date = new Date(date);
  const [day, month, year] = [
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    date.getFullYear(),
  ];

  const cancel = () => {
    setItemToEdit({});
    setErrors(false);
  };

  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Edit visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <label htmlFor="patientName">Patient name</label>
            </div>
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
            <div>
              <label htmlFor="date">Date</label>
            </div>
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
            <div>
              <label htmlFor="complaints">Complaints</label>
            </div>
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
          {errors &&
            (Array.isArray(errors) ? (
              <ul className="m-3 err-msg">
                {errors.map((error, index) => (
                  <li key={`err-${index}`}>{error}</li>
                ))}
              </ul>
            ) : (
              { errors }
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => updateVisit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEdit;
