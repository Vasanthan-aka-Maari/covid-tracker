import React from "react";
import CountUp from "react-countup";
import "./table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>
              <CountUp end={cases} duration={2.7} />
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
