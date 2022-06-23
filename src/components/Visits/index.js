import { useState, useContext, useEffect } from "react";
import ApiContext from "../../contexts/ApiContext";
import DoctorsContext from "../../contexts/DoctorsContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import { Table } from "reactstrap";
import "./visits.scss";

const Visits = () => {
  const api = useContext(ApiContext);
  const [visits, setVisits] = useState([]);
  const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    const allVisits = api.allVisits();
    allVisits
      .then((data) => {
        setVisits(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });

    const doctors = api.getAllDoctors();
    doctors
      .then((data) => {
        setdoctors(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, [api]);

  return (
    <main>
      <DoctorsContext.Provider value={doctors}>
        <VisitInputs setVisits={setVisits} />
        {visits.length ? (
          <Table responsive id="visits-table">
            <thead>
              <tr>
                {["Name", "Doctor", "Date", "Complaints"].map((thText) => (
                  <th key={`th-${thText}`}>{thText}</th>
                ))}
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <VisitItem {...visit} key={`visit-${visit.id}`} />
              ))}
            </tbody>
          </Table>
        ) : (
          <p id="no-visits-msg">No visits yet!</p>
        )}
      </DoctorsContext.Provider>
    </main>
  );
};

export default Visits;
