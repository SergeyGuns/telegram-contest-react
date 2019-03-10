import React from "react";
import cx from "classnames";

const GraphCheckboxes = ({ dataNames, onClick }) => (
  <div>
    {dataNames.map(([name, active]) => (
      <span onClick={onClick} data-name={name} className={active}>
        <span />
        <span>{name}</span>
      </span>
    ))}
  </div>
);
export default GraphCheckboxes;
