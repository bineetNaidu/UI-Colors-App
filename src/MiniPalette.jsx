import React from "react";
import { withStyles } from "@material-ui/styles";
import MiniPaletteStyles from "./styles/MiniPaletteStyles";

const styles = {
  ...MiniPaletteStyles,
};

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, handleClick } = props;
  const minicolorsboxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{minicolorsboxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
