import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

import withJss from "./../../helpers/jssHoc";
import { fetchTodos } from "./../../actions";

import Todo from "./../Todo";

function TodosList(props) {
  React.useEffect(() => {
    props.fetchTodos();
  }, []);

  function onTryAgain() {
    props.fetchTodos();
  }

  return (
    <div className={props.classes.todosList}>
      {props.loading && (
        <div className={props.classes.loader}>
          <Loader type="Circles" color="#00BFFF" height={40} width={40} />
        </div>
      )}
      {!props.loading && !props.error && <Todo />}
      {!props.error && (
        <div className={props.classes.existingTodos}>
          {props.todos.reverse().map(({ id, title }) => (
            <Todo key={id} id={id} title={title} />
          ))}
        </div>
      )}
      {!props.loading && props.error && (
        <div className={props.classes.error}>
          <p className={props.classes.errorMessage}>{props.error}</p>
          <p>Please, try again later.</p>
          <button className={props.classes.tryAgain} onClick={onTryAgain}>
            &#8635;
          </button>
        </div>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTodos }, dispatch);
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    error: state.error,
    loading: state.loading
  };
}

const styles = {
  todosList: {
    marginTop: 60,
    width: 600,
    maxWidth: "95vw",
    position: "relative"
  },
  existingTodos: {
    maxHeight: "80vh"
  },
  loader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: 40
  },
  error: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& > p": {
      marginTop: 0,
      marginBottom: 5
    }
  },
  errorMessage: {
    color: "#B22222"
  },
  tryAgain: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    fontSize: "1.2em",
    border: 0,
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: "#D3D3D3",
    "&:hover": {
      backgroundColor: "#00BFFF"
    }
  }
};

TodosList.propTypes = {
  classes: PropTypes.object.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  fetchTodos: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withJss(styles)(TodosList));
