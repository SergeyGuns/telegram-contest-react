import React, { Component } from "react";
import "./App.css";
import GraphWidget from "./GraphWidget/GraphWidget";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GraphWidget />
      </div>
    );
  }
}

export default App;
