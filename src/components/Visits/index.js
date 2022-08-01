import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import ModalDelete from "../ModalDelete";
import ModalEdit from "../ModalEdit";
import api from "../../services/ApiService";
import DoctorsContext from "../../contexts/DoctorsContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import validateVisit from "../../helpers/validateVisit";

import "./visits.scss";

const tableHeadings = ["Name", "Doctor", "Date", "Complaints"];

const Visits = () => {
  const [itemId, setItemToDeleteId] = useState(null);
  const [editItem, setItemToEdit] = useState({});
  const [visits, setVisits] = useState([]);
  const [doctors, setdoctors] = useState([]);
  const [errors, setErrors] = useState([]);
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

  const updateVisit = async () => {
    const { id } = editItem;
    const visit = validateVisit(editItem);
    if (visit.isValid) {
      const visits = api.updateVisit(id, editItem);
      visits
        .then((data) => {
          setVisits(data);
          setItemToEdit({});
          setErrors(null);
        })
        .catch((err) => {
          setErrors(err);
        });
    } else setErrors(visit.err);
  };

  return (
    <main>
      <DoctorsContext.Provider value={doctors}>
        {itemId && (
          <ModalDelete
            setItemToDeleteId={setItemToDeleteId}
            deleteVisit={deleteVisit}
          />
        )}
        {Object.keys(editItem).length > 0 && (
          <ModalEdit
            setItemToEdit={setItemToEdit}
            handleUpdateVisit={updateVisit}
            editItem={editItem}
            errors={errors}
            setErrors={setErrors}
          />
        )}
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
                  visitData={{ ...visit }}
                  key={`visit-${visit.id}`}
                  setItemToDeleteId={setItemToDeleteId}
                  setItemToEdit={setItemToEdit}
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
