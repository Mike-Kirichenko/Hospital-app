import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import ModalDelete from "../ModalDelete";
import ModalEdit from "../ModalEdit";
import FilterSort from "../FilterSort";
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
  const [sortBy, setSort] = useState({ sortKey: "", sortDir: "" });
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

  const setSortData = (sortObj) => {
    setSort({ ...sortBy, ...sortObj });
  };

  useEffect(() => {
    const { sortKey, sortDir } = sortBy;

    if (sortKey && sortDir) {
      visits.sort((a, b) => {
        let answer;
        const sortCriteria =
          sortKey === "doctor" ? a[sortKey].name : a[sortKey];
        if (sortDir === "ASC") {
          answer = sortCriteria < b[sortKey].name ? 1 : -1;
        } else if (sortDir === "DESC") {
          answer = sortCriteria > b[sortKey] ? 1 : -1;
        }
        return answer;
      });
      setVisits(visits);
    }
  }, [sortBy, visits]);

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
        <FilterSort setSort={setSortData} sortBy={sortBy} />
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
