import { FETCH_TODOS } from "../actions";
import { SAGA_STATUS } from "../sagas";

export default function todos(state = [], action) {
  switch (action.type) {
    case `${FETCH_TODOS}_${SAGA_STATUS.SUCCESS}`:
      return action.todos.data;
    default:
      return state;
  }
}
