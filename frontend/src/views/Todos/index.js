import React from "react";
import { connect } from "react-redux";

import withJss from "./../../helpers/jssHoc";
import TodosList from "./../../components/TodosList";

const styles = {
  todos: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  pageName: {
    width: 600,
    maxWidth: "95vw",
    position: "fixed",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    margin: 0,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  pageNameTodo: {
    margin: "0 5px",
    textDecoration: "underline"
  }
};

function Todos(props) {
  return (
    <div className={props.classes.todos}>
      <h2 className={props.classes.pageName}>
        What <span className={props.classes.pageNameTodo}>ToDo</span> today?
      </h2>
      <TodosList />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(withJss(styles)(Todos));
