import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";

import reducers from "./reducers";
import sagas from "./sagas";

import * as serviceWorker from "./serviceWorker";
import App from "./views/App";

import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(promise, sagaMiddleware));

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
