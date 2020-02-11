import { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./../actions";
import { SAGA_STATUS } from "./../sagas";

export default function serverError(state = null, action) {
  switch (action.type) {
    case `${FETCH_TODOS}_${SAGA_STATUS.REQUEST}`:
    case `${ADD_TODO}_${SAGA_STATUS.REQUEST}`:
    case `${UPDATE_TODO}_${SAGA_STATUS.REQUEST}`:
    case `${DELETE_TODO}_${SAGA_STATUS.REQUEST}`:
      return null;
    case `${FETCH_TODOS}_${SAGA_STATUS.FAILURE}`:
    case `${ADD_TODO}_${SAGA_STATUS.FAILURE}`:
    case `${UPDATE_TODO}_${SAGA_STATUS.FAILURE}`:
    case `${DELETE_TODO}_${SAGA_STATUS.FAILURE}`:
      return action.error.message === "Network Error"
        ? "Server is not running."
        : action.error.message;
    default:
      return state;
  }
}
