import React from "react";
import "./GraphWidgetControll.css";

export default class GraphWidgetControll extends React.Component {
  constructor(props) {
    super();
    this.data = props.data;
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
    const { dataNames } = this.props;
    const maxValue = Math.max(
      ...dataNames
        .filter(([_, active]) => active)
        .map(([name]) => Math.max(...this.data.map(el => el[name])))
    );
    const interval = this.width / this.data.length;
    return (
      <div className="graph-widget-controll">
        <svg
          height={this.height}
          onTouchMove={this.handlerTouchMoveReact}
          width={this.width}
        >
          {dataNames
            .filter(([_, active]) => active)
            .map(([name, _, color]) => (
              <Poliline
                key={name}
                interval={interval}
                data={this.data}
                maxValue={maxValue}
                height={this.height}
                name={name}
                color={color}
              />
            ))}

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

class Poliline extends React.Component {
  constructor({ data, name, interval, color, maxValue, height }) {
    super();
    this.state = {
      data,
      name,
      interval,
      color,
      maxValue,
      height,
      isAnimate: false
    };
    this.renderCounter = 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.maxValue !== this.state.maxValue &&
      this.state.isAnimate === false
    ) {
      this.setState(
        { isAnimate: true, prevState: JSON.parse(JSON.stringify(this.state)) },
        () => {
          console.log(this.animate);
          this.animate.beginElement();
        }
      );
      return true;
    }
    return false;
  }

  render() {
    const {
      data,
      name,
      interval,
      color,
      maxValue,
      height,
      isAnimate
    } = this.state;
    this.renderCounter += 1;
    console.log(name, this.renderCounter);
    return (
      <React.Fragment>
        <polyline
          className="poliline-animation"
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={
            isAnimate
              ? this.state.prevState.data
              : data
                  .map(
                    (el, i) =>
                      `${i * interval},${el[name] / (maxValue / height)}`
                  )
                  .join(" ")
          }
        >
          {isAnimate ? (
            <animate
              attributeName="points"
              dur="500ms"
              ref={node => (this.animate = node)}
              from={this.state.prevState.data
                .map(
                  (el, i) =>
                    `${i * interval},${el[name] /
                      (this.state.prevState.maxValue / height)}`
                )
                .join(" ")}
              to={data
                .map(
                  (el, i) => `${i * interval},${el[name] / (maxValue / height)}`
                )
                .join(" ")}
            />
          ) : null}
        </polyline>
      </React.Fragment>
    );
  }
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
