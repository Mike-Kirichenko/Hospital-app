import "./filterSort.css";

const FilterSort = ({ setSort, sortBy }) => {
  const { sortKey, sortDir } = sortBy;
  const sortDirOptions = [null, "ASC", "DESC"];
  const sortOptions = [
    [null, null],
    ["patient_name", "Patient Name"],
    ["date", "Date"],
    ["doctor", "Doctor"],
  ];

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
          {sortOptions.map((option) => {
            const [value, text] = option;
            return <option value={value}>{text}</option>;
          })}
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
              <option>{option}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
