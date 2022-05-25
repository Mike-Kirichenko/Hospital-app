import { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import TokenContext from "../../contexts/TokenContext";
import ApiContext from "../../contexts/ApiContext";
import "./visitInputs.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const VisitInputs = () => {
  const api = useContext(ApiContext);
  const [startDate, setStartDate] = useState(new Date());
  const { token } = useContext(TokenContext);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const doctors = api.getAllDoctors(token);
    doctors.then((data) => setDoctors(data));
  }, [api, token]);

  return (
    <form id="visitInputs" className="bottom-shadow">
      <div className="visitInputs-inp-wrapper">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="patient_name"
          placeholder="Patient name"
          id="name"
          className="visit-input"
        />
      </div>
      <div className="visitInputs-inp-wrapper ">
        <label htmlFor="doctor">Doctor</label>
        <select id="doctor" name="select" type="select" className="visit-input">
          {doctors.length &&
            doctors.map((doctor) => {
              const { name, id, specialty } = doctor;
              return (
                <option key={`doctor-${id}`}>
                  {name} ({specialty})
                </option>
              );
            })}
        </select>
      </div>
      <div className="visitInputs-inp-wrapper ">
        <label htmlFor="date">Date</label>
        <DatePicker
          name="date"
          placeholderText="dd/mm/yyyy"
          id="date"
          dateFormat="dd/MM/yyyy"
          showTimeSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="visit-input"
        />
      </div>
      <div className="visitInputs-inp-wrapper ">
        <label htmlFor="text">Complaints</label>
        <input
          name="text"
          placeholder="Add patient complaints"
          type="text"
          id="text"
          className="visit-input"
        />
      </div>
      <div className="visitInputs-inp-wrapper ">
        <button id="add-button">Add Visit</button>
      </div>
    </form>
  );
};

export default VisitInputs;
