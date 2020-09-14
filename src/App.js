import React, { PureComponent } from "react";
import seedColors from "./seedColors";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page";

import "./styles/Page.css";

export default class App extends PureComponent {
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
            <CSSTransition classNames="page" timeout={100} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={(routerProps) => (
                    <Page>
                      <PaletteList
                        palettes={palettes}
                        {...routerProps}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        {...routeProps}
                        palettes={this.state.palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routerProps) => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routerProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routerProps) => (
                    <Page>
                      <SingleColorPalette
                        colorId={routerProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routerProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route render={() => <h1>404 NOT FOUND</h1>} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
