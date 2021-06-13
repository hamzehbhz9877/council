import { createStore, compose, applyMiddleware } from "redux";
import { RootReducer } from "../reducer";
import thunk from "redux-thunk";

export const store = createStore(
    RootReducer,
    compose(
        applyMiddleware(thunk)
    )
);
