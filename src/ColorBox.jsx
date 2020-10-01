import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import ColorBoxStyles from "./styles/ColorBoxStyles";

const styles = { ...ColorBoxStyles };

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };
    this.handleCopyState = this.handleCopyState.bind(this);
  }

  handleCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const {
      background,
      name,
      paletteId,
      id,
      showingFullPalette,
      classes,
    } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopyState}>
        <div className={classes.ColorBox} style={{ background }}>
          <div
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
            style={{ background }}
          />
          <div
            className={classNames(classes.copyMsg, {
              [classes.showMsg]: copied,
            })}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
