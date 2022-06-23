import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { validName, validText } from "../../helpers/validator";
import { MsgWindow } from "../MsgWindow";
import ApiContext from "../../contexts/ApiContext";
import DoctorsContext from "../../contexts/DoctorsContext";
import "./visitInputs.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const VisitInputs = ({ setVisits }) => {
  const api = useContext(ApiContext);
  const doctors = useContext(DoctorsContext);
  const [msg, setMsg] = useState("");
  const [visitInpData, setvisitInpData] = useState({
    patient_name: "",
    doctor_id: "",
    date: "",
    text: "",
  });

  const setVisitPartials = (inputObj) => {
    setvisitInpData({ ...visitInpData, ...inputObj });
  };

  const addNewVisit = async () => {
    const err = [];
    if (!patient_name || !doctor_id || !text || !date)
      setMsg({ type: "err", text: "All visit info is required" });
    else {
      if (!validName(patient_name)) err.push("Invalid name");
      if (typeof doctor_id !== "number") err.push("No doctor information");
      if (!validText(text)) err.push("Invalid complaints text");
      if (!err.length) {
        setMsg("");
        try {
          const withAdded = await api.createVisit(visitInpData);
          if (withAdded) {
            setMsg({ type: "succ", text: "New visit successfully added!" });
            setVisits(withAdded);
            setvisitInpData({
              patient_name: "",
              doctor_id: "",
              date: "",
              text: "",
            });
          }
        } catch (err) {
          const { msg } = err.response.data;
          setMsg({ type: "err", text: msg });
        }
      } else {
        setMsg({ type: "err", text: err });
      }
    }
  };

  const { patient_name, doctor_id, date, text } = visitInpData;

  return (
    <div id="visitInputs" className="bottom-shadow">
      <div className="visitInputs-inp-wrapper">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="patient_name"
          placeholder="Patient name"
          id="name"
          className="visit-input"
          onInput={({ target }) =>
            setVisitPartials({ patient_name: target.value })
          }
          value={patient_name}
        />
      </div>
      <div className="visitInputs-inp-wrapper">
        <label htmlFor="doctor">Doctor</label>
        <select
          id="doctor"
          name="doctor"
          type="select"
          className="visit-input"
          onChange={({ target }) =>
            setVisitPartials({ doctor_id: parseInt(target.value) })
          }
          value={doctor_id}
        >
          <option value={null}>---Select doctor---</option>
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
      <div className="visitInputs-inp-wrapper ">
        <label htmlFor="date">Date</label>
        <DatePicker
          name="date"
          placeholderText="dd.mm.yyyy"
          id="date"
          dateFormat="dd.MM.yyyy"
          selected={visitInpData.date}
          onChange={(date) => setVisitPartials({ date })}
          className="visit-input"
          value={date}
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
          onInput={({ target }) => setVisitPartials({ text: target.value })}
          value={text}
        />
      </div>
      <div className="visitInputs-inp-wrapper">
        <button id="add-button" type="button" onClick={addNewVisit}>
          Add Visit
        </button>
      </div>
      {msg && <MsgWindow msg={msg} setMsg={setMsg} />}
    </div>
  );
};

export default VisitInputs;
