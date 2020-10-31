import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import * as fromRootReducer from "../reducers/index1"

export type rootState = {
    rootStore: fromRootReducer.rootState
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore<rootState, any, any, any>(
    combineReducers({
        rootStore: fromRootReducer.rootReducer,
    }), enhancer);

export default store;