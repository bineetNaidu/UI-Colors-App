import React from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
function App() {
  return (
    <div className="App">
      <Palette {...seedColors[5]} />
    </div>
  );
}

export default App;
