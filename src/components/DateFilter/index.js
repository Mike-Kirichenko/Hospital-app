import DatePicker from "react-datepicker";
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
              minDate={dateFrom}
            />
          </div>
          <div className="date-inp-wrapper">
            <button id="filter-button" onClick={() => startFilter()}>
              Filter by date
            </button>
          </div>
        </>
      )}
      {!filter ? (
        <div id="dateFilterLabel">
          <b>Add filter by date</b>&nbsp;&nbsp;
          <span onClick={() => setDateFilter({ filter: true })}>
            <i className="fa fa-plus edit-items " aria-hidden="true" />
          </span>
        </div>
      ) : (
        <div id="dateFilterLabel" onClick={() => setInitialData()}>
          <i className="fa fa-trash-o edit-items" />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
