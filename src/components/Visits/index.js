import { useState, useContext, useEffect } from "react";
import ApiContext from "../../contexts/ApiContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import { Table } from "reactstrap";
import "./visits.scss";

const Visits = () => {
  const api = useContext(ApiContext);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const allVisits = api.allVisits();
    allVisits
      .then((data) => setVisits(data))
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, [api]);

  if (!visits.length) return "no data...";
  return (
    <main>
      <VisitInputs />
      {visits.length ? (
        <Table responsive id="visits-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Complaints</th>
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
    </main>
  );
};

export default Visits;
