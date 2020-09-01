import React from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
import { generatePalette } from "./colorHelpers";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
