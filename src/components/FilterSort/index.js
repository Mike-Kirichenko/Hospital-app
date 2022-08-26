import "./filterSort.css";

const FilterSort = ({ setSort, sortBy }) => {
  const { sortKey, sortDir } = sortBy;
  const sortDirOptions = [null, "ASC", "DESC"];
  const sortOptions = [
    { label: null, value: null },
    { label: "Patient Name", value: "patient_name" },
    { label: "Date", value: "date" },
    { label: "Doctor", value: "doctor" },
  ];

  return (
    <div id="sortInputs">
      <div className="sort-inp-wrapper">
        <label htmlFor="name">Sort By</label>
        <select
          type="select"
          className="info-input"
          onChange={({ target }) => setSort({ sortKey: target.value })}
          value={sortKey}
        >
          {sortOptions.map((option, index) => {
            const { label, value } = option;
            return (
              <option key={`sort-option-${index}`} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {sortKey && (
        <div className="sort-inp-wrapper">
          <label htmlFor="name">Sort Direction</label>
          <select
            type="select"
            className="info-input"
            value={sortDir}
            onChange={({ target }) => setSort({ sortDir: target.value })}
          >
            {sortDirOptions.map((option, index) => (
              <option key={`sort-option-${index}`}>{option}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
