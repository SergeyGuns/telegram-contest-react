import React from "react";
import data from "./genereted.json";
import GraphWidgetControll from "./GraphWidgetControll.js";
import GraphCheckboxes from "./GraphCheckboxes";
export default class GraphWidget extends React.Component {
  constructor() {
    super();
    this.data = data;
    this.interval = 20;
    this.height = 50;
    this.width = 414;
    this.rectWidth = 50;
    this.rectX = 0;
    this.state = {
      dataNames: [["value_1", true, "red"], ["value_2", false, "green"]]
    };
  }

  handleToggleCheckbox = ({
    target: {
      dataset: { name }
    }
  }) =>
    this.setState({
      dataNames: this.state.dataNames.map(([dataName, value, color]) => [
        dataName,
        name === dataName ? !value : value,
        color
      ])
    });

  render() {
    return (
      <div style={{ height: this.height }} className="graph-widget">
        <GraphWidgetControll
          data={this.data}
          dataNames={this.state.dataNames}
        />
        <GraphCheckboxes
          onClick={this.handleToggleCheckbox}
          dataNames={this.state.dataNames}
        />
      </div>
    );
  }
}
