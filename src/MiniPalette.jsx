import React from "react";
import { withStyles } from "@material-ui/styles";
import MiniPaletteStyles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  ...MiniPaletteStyles,
};

function MiniPalette(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    id,
    openDialog,
  } = props;
  const minicolorsboxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));
  const deletePalette = (e) => {
    e.stopPropagation();
    // handleDelete(id);
    openDialog(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon
        onClick={deletePalette}
        className={classes.deleteIcon}
        style={{ transition: "all 0.3s ease-in-out" }}
      />

      <div className={classes.colors}>{minicolorsboxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
