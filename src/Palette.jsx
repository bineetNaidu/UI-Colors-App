import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
    };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorboxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ));

    return (
      <div className="Palette">
        {/* navbar goes here */}
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        <div className="Palette-colors">
          {/* color boxes */}
          {colorboxes}
        </div>
        {/* footer */}
      </div>
    );
  }
}
