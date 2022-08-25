import "./filterSort.css";

const FilterSort = ({ setSort, sortBy }) => {
  const { sortKey, sortDir } = sortBy;
  const sortDirOptions = [null, "ASC", "DESC"];

  return (
    <div id="sortInputs">
      <div className="sort-inp-wrapper">
        <label htmlFor="name">Sort By</label>
        <select
          type="select"
          className="filter-input"
          onChange={({ target }) => setSort({ sortKey: target.value })}
          value={sortKey}
        >
          <option>{null}</option>
          <option value="patient_name">Patient Name</option>
          <option value="date">Date</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>
      {sortKey && (
        <div className="sort-inp-wrapper">
          <label htmlFor="name">Sort Direction</label>
          <select
            type="select"
            className="filter-input"
            value={sortDir}
            onChange={({ target }) => setSort({ sortDir: target.value })}
          >
            {sortDirOptions.map((option) => (
              <option onClick={() => alert("OK")}>{option}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
