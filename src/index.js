import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import createSaga from "redux-saga"


import Style from "./index.css";

import App from "./App";
import burgerReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth';

import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas'

const rootReducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
})

const saga = createSaga();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk,saga)));

saga.run(watchAuth)
saga.run(watchBurgerBuilder)
saga.run(watchOrder)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App className={Style} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
