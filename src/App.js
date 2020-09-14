import React, { Component } from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors,
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocals
    );
  }
  syncLocals() {
    // save palettes to localStorages;
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  deletePalette(id) {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((p) => p.id !== id),
      }),
      this.syncLocals
    );
  }

  render() {
    const { palettes } = this.state;
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={(routerProps) => (
                    <div className="page">
                      <PaletteList
                        palettes={palettes}
                        {...routerProps}
                        deletePalette={this.deletePalette}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <div className="page">
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        {...routeProps}
                        palettes={this.state.palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routerProps) => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routerProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routerProps) => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routerProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routerProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
