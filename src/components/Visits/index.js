import { useState, useEffect } from "react";
import moment from "moment";
import { Table } from "reactstrap";
import ModalDelete from "../ModalDelete";
import ModalEdit from "../ModalEdit";
import SortInputs from "../SortInputs";
import DateFilter from "../DateFilter";
import api from "../../services/ApiService";
import DoctorsContext from "../../contexts/DoctorsContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import validateVisit from "../../helpers/validateVisit";
import "./visits.scss";

let visitsInitial;
const tableHeadings = ["Name", "Doctor", "Date", "Complaints"];

const Visits = () => {
  const [itemId, setItemToDeleteId] = useState(null);
  const [editItem, setItemToEdit] = useState({});
  const [visits, setVisits] = useState([]);
  const [sortBy, setSort] = useState({ sortKey: "", sortDir: "" });
  const [doctors, setdoctors] = useState([]);
  const [modalErrors, setErrors] = useState([]);
  const [dateRange, setDateFilter] = useState({
    filter: false,
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    const allVisits = api.allVisits();
    allVisits
      .then((data) => {
        setVisits(data);
        visitsInitial = data;
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

  /*
    Here we select all new visits that match 
    visits from last state, related to sorting/filtering. We update state with this new data,
    Function is usually called after update or delete
    */
  const setFilterAndSortRelatedState = (data) => {
    setVisits((oldVisits) => {
      return data.filter((newVisits) => {
        const found = oldVisits.findIndex((visit) => newVisits.id === visit.id);
        return found > -1;
      });
    });
  };

  const deleteVisit = () => {
    const visits = api.deleteVisit(itemId);
    visits.then((data) => {
      setItemToDeleteId(null);
      setFilterAndSortRelatedState(data);
      visitsInitial = data;
    });
  };

  const updateVisit = async () => {
    const { id } = editItem;
    const visit = validateVisit(editItem);
    if (visit.isValid) {
      const visits = api.updateVisit(id, editItem);
      visits
        .then((data) => {
          setItemToEdit({});
          setErrors(null);
          setFilterAndSortRelatedState(data);
          visitsInitial = data;
        })
        .catch((err) => {
          setErrors(err);
        });
    } else setErrors(visit.err);
  };

  const setSortData = (sortObj) => {
    setSort({ ...sortBy, ...sortObj });
  };

  const handleSetDateFilter = (dateRangeObj) => {
    setDateFilter({ ...dateRange, ...dateRangeObj });
  };

  const sortVisits = () => {
    const { sortKey, sortDir } = sortBy;
    if (sortKey && sortDir) {
      const sorted = [...visits].sort((a, b) => {
        const aValue = sortKey === "doctor" ? a[sortKey].name : a[sortKey];
        const bValue = sortKey === "doctor" ? b[sortKey].name : b[sortKey];
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      });
      if (sortDir === "DESC") sorted.reverse();
      setVisits(sorted);
    }
  };

  const handleDateFilter = () => {
    const { dateFrom, dateTo } = dateRange;
    if (dateFrom && dateTo) {
      const formattedDateFrom = moment(dateFrom).format("YYYY-MM-DD");
      const formattedDateTo = moment(dateTo).format("YYYY-MM-DD");
      if (formattedDateTo >= formattedDateFrom) {
        const filtered = visitsInitial.filter(
          (visit) =>
            visit.date >= formattedDateFrom && visit.date <= formattedDateTo
        );
        setVisits(filtered);
      }
    }
  };

  const handleSetInitialData = () => {
    setVisits(visitsInitial);
    setDateFilter({ filter: false, dateFrom: "", dateTo: "" });
  };

  useEffect(() => {
    sortVisits();
  }, [sortBy]);

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
            errors={modalErrors}
            setErrors={setErrors}
          />
        )}
        <VisitInputs setVisits={setVisits} />
        <SortInputs setSort={setSortData} sortBy={sortBy} />
        <DateFilter
          dateRange={dateRange}
          setDateFilter={handleSetDateFilter}
          startFilter={handleDateFilter}
          setInitialData={handleSetInitialData}
        />

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
