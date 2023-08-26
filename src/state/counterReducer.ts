import {loadState} from "../localStorage";

const CHANGE_VALUE_MAX = "CHANGE_VALUE_MAX"
const CHANGE_VALUE_START = "CHANGE_VALUE_START"
const CHANGE_VALUE_TABLE = "CHANGE_VALUE_TABLE"
const CHANGE_IS_FOCUS = "CHANGE_IS_FOCUS"
const CHANGE_COUNTER = "CHANGE_COUNTER"

export type StateType = {
    valueMax: number
    valueStart: number
    valueTable: string
    isFocus: boolean
    counter: number
}

type changeValueMaxAT = {
    type: typeof CHANGE_VALUE_MAX
    payload: {num: number}
}
type changeValueStartAT = {
    type: typeof CHANGE_VALUE_START
    payload: {num: number}
}
type ChangeValueTableAT = {
    type: typeof CHANGE_VALUE_TABLE
    payload: {text: string}
}
type ChangeIsFocusAT = {
    type: typeof CHANGE_IS_FOCUS
    payload: {value: boolean}
}
type ChangeCounterAT = {
    type: typeof CHANGE_COUNTER
    payload: {num: number}
}

type ActionsType = changeValueMaxAT | changeValueStartAT | ChangeValueTableAT | ChangeIsFocusAT | ChangeCounterAT

const initialState: StateType = {
    valueMax: loadState('valueMax') ? loadState('valueMax') : 0,
    valueStart: loadState('valueStart') ? loadState('valueStart') : 0,
    valueTable: '',
    isFocus: false,
    counter: loadState('valueStart') ? loadState('valueStart') : 0,
}

export const counterReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "CHANGE_VALUE_MAX":
            return {
                ...state,
                valueMax: action.payload.num
            }
        case "CHANGE_VALUE_START":
            return {
                ...state,
                valueStart: action.payload.num
            }
        case "CHANGE_VALUE_TABLE":
            return {
                ...state,
                valueTable: action.payload.text
            }
        case "CHANGE_IS_FOCUS":
            return {
                ...state,
                isFocus: action.payload.value
            }
        case "CHANGE_COUNTER":
            debugger
            return {
                ...state,
                counter: action.payload.num
            }
        default:
            return state
    }
}

export const ChangeValueMaxAC = (num: number): changeValueMaxAT => ({
   type: CHANGE_VALUE_MAX,
    payload: {
       num
    }
})

export const ChangeValueStartAC = (num: number): changeValueStartAT => ({
    type: CHANGE_VALUE_START,
    payload: {
        num
    }
})

export const ChangeValueTableAC = (text: string): ChangeValueTableAT => ({
    type: CHANGE_VALUE_TABLE,
    payload:{text}
})

export const ChangeIsFocusAC = (value: boolean): ChangeIsFocusAT => ({
    type: CHANGE_IS_FOCUS,
    payload: {value}
})

export const ChangeCounterAC = (num:number): ChangeCounterAT => {
    return{
        type: CHANGE_COUNTER,
        payload:{num}
    } as const
}