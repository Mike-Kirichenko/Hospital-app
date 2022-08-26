import DatePicker from "react-datepicker";
import PlusIcon from "../SVG/Plus";
import DeleteIcon from "../SVG/Delete";
import "./dateFilter.css";

const DateFilter = ({
  dateRange,
  setDateFilter,
  startFilter,
  setInitialData,
}) => {
  const { dateFrom, dateTo, filter } = dateRange;

  return (
    <div id="dateFilter">
      {filter && (
        <>
          <div className="date-inp-wrapper">
            <label htmlFor="date-from">From</label>
            <DatePicker
              name="date"
              placeholderText="dd.mm.yyyy"
              id="date-from"
              dateFormat="dd.MM.yyyy"
              className="info-input"
              selected={dateFrom}
              onChange={(dateFrom) => setDateFilter({ dateFrom })}
              value={dateFrom}
            />
          </div>
          <div className="date-inp-wrapper">
            <label htmlFor="date-to">To</label>
            <DatePicker
              name="date"
              placeholderText="dd.mm.yyyy"
              id="date-to"
              dateFormat="dd.MM.yyyy"
              className="info-input"
              selected={dateTo}
              onChange={(dateTo) => setDateFilter({ dateTo })}
              value={dateTo}
            />
          </div>
          <div className="date-inp-wrapper" style={{ width: "15%" }}>
            <button id="filter-button" onClick={() => startFilter()}>
              Filter by date
            </button>
          </div>
        </>
      )}
      {!filter ? (
        <div id="dateFilterLabel">
          <b>Add filter by date</b>&nbsp;&nbsp;
          <PlusIcon
            options={{ width: "12%", height: "12%" }}
            setDateFilter={setDateFilter}
          />
        </div>
      ) : (
        <div id="dateFilterLabel">
          <DeleteIcon
            options={{ width: "12%", height: "12%" }}
            setInitialData={setInitialData}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
