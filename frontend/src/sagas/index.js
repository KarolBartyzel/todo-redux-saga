import axios from "axios";
import { call, put, takeEvery, all } from "redux-saga/effects";

import { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./../actions";

const SERVER_URL = "http://localhost:3005";

export const SAGA_STATUS = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE"
};

export function* fetchTodos() {
  try {
    yield put({ type: `${FETCH_TODOS}_${SAGA_STATUS.REQUEST}` });
    const todos = yield call(axios.get, `${SERVER_URL}/todos`);
    yield put({ type: `${FETCH_TODOS}_${SAGA_STATUS.SUCCESS}`, todos });
  } catch (error) {
    yield put({ type: `${FETCH_TODOS}_${SAGA_STATUS.FAILURE}`, error });
  }
}

function* watchFetchTodos() {
  yield takeEvery(FETCH_TODOS, fetchTodos);
}

export function* addTodo({ title }) {
  const newTodo = { title };
  try {
    yield put({ type: `${ADD_TODO}_${SAGA_STATUS.REQUEST}` });
    yield call(axios.post, `${SERVER_URL}/todos`, newTodo);
    yield put({ type: FETCH_TODOS });
  } catch (error) {
    yield put({ type: `${ADD_TODO}_${SAGA_STATUS.FAILURE}`, error });
  }
}

function* watchAddTodo() {
  yield takeEvery(ADD_TODO, addTodo);
}

export function* updateTodo({ id, title }) {
  const updatedTodo = { id, title };
  try {
    yield put({ type: `${UPDATE_TODO}_${SAGA_STATUS.REQUEST}` });
    yield call(axios.put, `${SERVER_URL}/todos/${id}`, updatedTodo);
    yield put({ type: FETCH_TODOS });
  } catch (error) {
    yield put({ type: `${UPDATE_TODO}_${SAGA_STATUS.FAILURE}`, error });
  }
}

function* watchUpdateTodo() {
  yield takeEvery(UPDATE_TODO, updateTodo);
}

export function* deleteTodo({ id }) {
  try {
    yield put({ type: `${DELETE_TODO}_${SAGA_STATUS.REQUEST}` });
    yield call(axios.delete, `${SERVER_URL}/todos/${id}`);
    yield put({ type: FETCH_TODOS });
  } catch (error) {
    yield put({ type: `${DELETE_TODO}_${SAGA_STATUS.FAILURE}`, error });
  }
}

function* watchDeleteTodo() {
  yield takeEvery(DELETE_TODO, deleteTodo);
}

export default function* rootSaga() {
  yield all([
    watchFetchTodos(),
    watchAddTodo(),
    watchUpdateTodo(),
    watchDeleteTodo()
  ]);
}
