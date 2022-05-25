import { useState, useContext, useEffect } from "react";
import ApiContext from "../../contexts/ApiContext";
import VisitInputs from "../VisitInputs";
import VisitItem from "../VisitItem";
import TokenContext from "../../contexts/TokenContext";
import { Table } from "reactstrap";
import "./visits.css";

const Visits = () => {
  const api = useContext(ApiContext);
  const [visits, setVisits] = useState([]);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const allVisits = api.allVisits(token);
    allVisits
      .then((data) => setVisits(data))
      .catch(() => {
        setToken(null);
        localStorage.removeItem("jwt");
      });
  }, [api, setToken, token]);

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
