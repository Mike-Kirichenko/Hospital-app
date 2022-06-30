import ModalConfirm from "../ModalConfirm";
import { useState, useEffect } from "react";
import api from "../../services/ApiService";
import DoctorsContext from "../../contexts/DoctorsContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import { Table } from "reactstrap";
import "./visits.scss";

const tableHeadings = ["Name", "Doctor", "Date", "Complaints"];

const Visits = () => {
  const [itemId, setItemToDeleteId] = useState(null);

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
  }, []);

  const deleteVisit = () => {
    const visits = api.deleteVisit(itemId);
    visits.then((data) => {
      setVisits(data);
      setItemToDeleteId(null);
    });
  };

  return (
    <main>
      {itemId && (
        <ModalConfirm
          setItemToDeleteId={setItemToDeleteId}
          deleteVisit={deleteVisit}
        />
      )}
      <DoctorsContext.Provider value={doctors}>
        <VisitInputs setVisits={setVisits} />
        {visits.length ? (
          <Table responsive id="visits-table">
            <thead>
              <tr>
                {tableHeadings.map((thText) => (
                  <th key={`th-${thText}`}>{thText}</th>
                ))}
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <VisitItem
                  {...visit}
                  key={`visit-${visit.id}`}
                  setItemToDeleteId={setItemToDeleteId}
                />
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
