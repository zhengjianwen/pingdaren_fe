import { createStore, compose, applyMiddleware } from 'redux';

import reducer from './reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//__REDUX_DEVTOOLS_EXTENSION_COMPOSE__浏览器未装该插件
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { logger } from "redux-logger"

let middle = [reduxThunk, reduxPromise]
if (process.env.NODE_ENV == "development") {
    middle.push(logger)
}

//import * as DefaultState from "@/redux/default-state";

let store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middle)
));

// const store = createStore(reducer, composeEnhancers(
//     applyMiddleware(reduxThunk, reduxPromise)
// ));

export default store;
