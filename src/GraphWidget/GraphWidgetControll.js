import React from "react";

export default class GraphWidgetControll extends React.Component {
  constructor(props) {
    super();
    this.data = props.data;
    this.maxValue = Math.max(
      Math.max(...this.data.map(el => el.value_1)),
      Math.max(...this.data.map(el => el.value_2))
    );
    this.height = 50;
    this.width = 414;
    this.rectWidth = 50;
    this.rectX = 0;
    this.state = {
      rectX: 0
    };
  }

  handlerTouchMoveReact = ({ touches: [{ clientX }] }) => {
    const validateClientXMin = clientX =>
      clientX - this.rectWidth / 2 < 0 ? 0 + this.rectWidth / 2 : clientX;
    const validateClientXMax = clientX =>
      clientX + this.rectWidth / 2 > this.width
        ? this.width - this.rectWidth / 2
        : clientX;
    this.setState({
      rectX:
        validateClientXMin(validateClientXMax(clientX)) - this.rectWidth / 2
    });
  };

  render() {
    const interval = this.width / this.data.length;
    return (
      <div className="graph-widget-controll">
        <svg
          height={this.height}
          onTouchMove={this.handlerTouchMoveReact}
          width={this.width}
        >
          <Poliline
            interval={interval}
            data={this.data}
            maxValue={this.maxValue}
            height={this.height}
            name="value_1"
            color="red"
          />
          <Poliline
            interval={interval}
            data={this.data}
            maxValue={this.maxValue}
            height={this.height}
            name="value_2"
            color="green"
          />
          <Rect
            posX={this.state.rectX}
            width={this.rectWidth}
            height={this.height}
            color="blue"
          />
        </svg>
      </div>
    );
  }
}

function Poliline({ data, name, interval, color, maxValue, height }) {
  return (
    <polyline
      points={data
        .map((el, i) => `${i * interval},${el[name] / (maxValue / height)}`)
        .join(" ")}
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
  );
}

function Rect({ posX, width, height, color }) {
  return (
    <rect
      fill="none"
      stroke={color}
      x={posX}
      y="0"
      width={width}
      height={height}
    />
  );
}
