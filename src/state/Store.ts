import {combineReducers, createStore} from "redux"
import {counterReducer} from "./counterReducer";

const RootReducer = combineReducers({
    counter: counterReducer
})

export type RootReducerType = ReturnType<typeof RootReducer>

export const store = createStore(RootReducer)