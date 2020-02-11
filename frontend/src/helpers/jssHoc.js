import React from "react";
import { createUseStyles } from "react-jss";

const withJss = styles => WrappedComponent => {
  function WithJss(props) {
    const classes = createUseStyles(styles)();
    return <WrappedComponent {...props} classes={classes} />;
  }
  return WithJss;
};

export default withJss;
