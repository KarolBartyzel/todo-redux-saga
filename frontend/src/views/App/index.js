import React from "react";
import PropTypes from "prop-types";

import withJss from "./../../helpers/jssHoc";
import Todos from "./../Todos";

const styles = {
  app: {
    height: "100vh",
    width: "99vw"
  }
};

function App(props) {
  return (
    <div className={props.classes.app}>
      <Todos />
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withJss(styles)(App);
