import React, { Component } from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PaletteList palettes={seedColors} />}
          />
          <Route
            exact
            path="/palette/:id"
            render={(routerProps) => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routerProps.match.params.id)
                )}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
