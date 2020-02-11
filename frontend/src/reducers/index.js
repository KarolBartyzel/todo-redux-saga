import { combineReducers } from "redux";
import loadingReducer from "./loading";
import serverErrorReducer from "./serverError";
import todosReducer from "./todos";

const rootReducer = combineReducers({
  todos: todosReducer,
  error: serverErrorReducer,
  loading: loadingReducer
});

export default rootReducer;
