import React, { Component } from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      palettes: seedColors,
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }

  render() {
    const { palettes } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(routerProps) => (
              <PaletteList palettes={palettes} {...routerProps} />
            )}
          />
          <Route
            exact
            path="/palette/new"
            render={(routeProps) => (
              <NewPaletteForm
                savePalette={this.savePalette}
                {...routeProps}
                palettes={this.state.palettes}
              />
            )}
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
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={(routerProps) => (
              <SingleColorPalette
                colorId={routerProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routerProps.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
