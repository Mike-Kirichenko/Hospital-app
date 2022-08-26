import "./dateFilter.css";
import DatePicker from "react-datepicker";
import PlusIcon from "../SVG/plus";

const DateFilter = () => {
  return (
    <div id="dateFilter">
      <div className="date-inp-wrapper">
        <label>
          <b>From:&nbsp;</b>
        </label>
        <DatePicker
          name="date"
          placeholderText="dd.mm.yyyy"
          id="date"
          dateFormat="dd.MM.yyyy"
          className="info-input"
        />
      </div>
      <div className="date-inp-wrapper">
        <b>To:&nbsp;</b>
        <DatePicker
          name="date"
          placeholderText="dd.mm.yyyy"
          id="date"
          dateFormat="dd.MM.yyyy"
          className="info-input"
        />
      </div>
      <div id="dateFilterLabel">
        <b>Add filter by date</b>&nbsp;&nbsp;
        <PlusIcon options={{ width: "12%", height: "12%" }} />
      </div>
    </div>
  );
};

export default DateFilter;
