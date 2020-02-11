export const FETCH_TODOS = "FETCH_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export function fetchTodos() {
  return { type: FETCH_TODOS };
}

export function addTodo(title) {
  return { type: ADD_TODO, title };
}

export function updateTodo(id, title) {
  return { type: UPDATE_TODO, id, title };
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id };
}
