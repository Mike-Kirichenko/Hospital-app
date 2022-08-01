import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import validateVisit from "../../helpers/validateVisit";
import { MsgWindow } from "../MsgWindow";
import api from "../../services/ApiService";
import DoctorsContext from "../../contexts/DoctorsContext";
import "./visitInputs.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const VisitInputs = ({ setVisits }) => {
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
    const validVisitData = validateVisit(visitInpData);
    if (!validVisitData.isValid)
      setMsg({ type: "err", text: validVisitData.err });
    else {
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
