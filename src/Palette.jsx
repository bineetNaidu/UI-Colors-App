import React, { Component } from "react";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

import { withStyles } from "@material-ui/styles";
import PaletteStyles from "./styles/PaletteStyles";

const styles = {
  ...PaletteStyles,
};

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(value) {
    this.setState({ format: value });
  }

  render() {
    const { classes } = this.props;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorboxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        showingFullPalette={true}
        paletteId={id}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider
        />
        <div className={classes.PaletteColors}>{colorboxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
