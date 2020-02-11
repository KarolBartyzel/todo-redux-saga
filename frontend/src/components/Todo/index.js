import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import withJss from "./../../helpers/jssHoc";
import { addTodo, updateTodo, deleteTodo } from "./../../actions";

function Todo(props) {
  const [isEdited, setIsEdited] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.textContent = props.title;
  }, [props.title, isEdited]);

  function onDelete() {
    props.deleteTodo(props.id);
  }

  function onInputFocus() {
    setIsEdited(true);
  }

  function onSave(title) {
    const trimmedTitle = title.trim();
    if (props.id === null) {
      if (trimmedTitle !== "") {
        props.addTodo(trimmedTitle);
      }
    } else if (trimmedTitle === "") {
      props.deleteTodo(props.id);
    } else if (trimmedTitle !== props.title) {
      props.updateTodo(props.id, trimmedTitle);
    }
    setIsEdited(false);
  }

  function onInputBlur() {
    onSave(inputRef.current.textContent);
  }

  function onEditCancel() {
    inputRef.current.textContent = props.title;
    setIsEdited(false);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    onSave(inputRef.current.textContent);
  }

  return (
    <div className={props.classes.todo}>
      <div
        ref={inputRef}
        contentEditable
        placeholder="Add new todo..."
        autoFocus={props.id === null}
        className={props.classes.todoTitle}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      ></div>

      {isEdited && (
        <form onSubmit={onFormSubmit}>
          <button
            type="button"
            className={props.classes.todoButton}
            onClick={onEditCancel}
          >
            ❌
          </button>
          <button type="submit" className={props.classes.todoButton}>
            ✔️
          </button>
        </form>
      )}
      {!isEdited && props.id !== null && (
        <button className={props.classes.todoButton} onClick={onDelete}>
          🗑
        </button>
      )}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo, updateTodo, deleteTodo }, dispatch);
}

const styles = {
  todo: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#E0FFFF",
    borderRadius: "10px",
    margin: 5
  },
  todoTitle: {
    margin: 3,
    width: "calc(100% - 80px)",
    maxHeight: "20vh",
    overflow: "auto",
    wordWrap: "break-word",
    padding: 10,

    "&:focus": {
      minHeight: 80,
      border: "1px solid #00BFFF",
      outline: "0px solid transparent",
      padding: 9,
      borderRadius: 10
    },
    "&:empty:not(:focus):before": {
      content: "attr(placeholder)",
      color: "grey",
      fontStyle: "italic"
    }
  },
  todoButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    fontSize: "1.2em",
    border: 0,
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: "#E0FFFF",

    "&:hover": {
      backgroundColor: "#FFFFFF"
    }
  }
};

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

Todo.defaultProps = {
  id: null,
  title: ""
};

export default connect(null, mapDispatchToProps)(withJss(styles)(Todo));
