import { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./../actions";
import { SAGA_STATUS } from "./../sagas";

export default function loading(state = true, action) {
  switch (action.type) {
    case `${FETCH_TODOS}_${SAGA_STATUS.REQUEST}`:
    case `${ADD_TODO}_${SAGA_STATUS.REQUEST}`:
    case `${UPDATE_TODO}_${SAGA_STATUS.REQUEST}`:
    case `${DELETE_TODO}_${SAGA_STATUS.REQUEST}`:
      return true;
    default:
      return false;
  }
}
