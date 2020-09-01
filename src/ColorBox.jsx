import React, { Component } from "react";
import "./ColorBox.css";

export default class ColorBox extends Component {
  render() {
    return (
      <div
        className="ColorBox"
        style={{ backgroundColor: this.props.background }}
      >
        <span>{this.props.name}</span>
        <span>MORE</span>
      </div>
    );
  }
}
