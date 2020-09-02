import React from "react";

function PaletteFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <div>
      <footer className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    </div>
  );
}

export default PaletteFooter;
