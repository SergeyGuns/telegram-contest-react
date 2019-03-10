import React from "react";
import cx from "classnames";

import "./GraphCheckboxes.scss";

const GraphCheckboxes = ({ dataNames, onClick }) => (
  <div className="graph-checkboxes">
    {dataNames.map(([name, active, color]) => (
      <label
        key={name}
        onClick={onClick}
        data-name={name}
        className="graph-checkboxes__label"
      >
        <span
          style={{ backgroundColor: color }}
          className={cx("graph-checkboxes__mark", {
            "graph-checkboxes__mark_active": active
          })}
        />
        <span className="graph-checkboxes__name">{name}</span>
      </label>
    ))}
  </div>
);
export default GraphCheckboxes;
