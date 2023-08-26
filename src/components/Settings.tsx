import {SuperButton} from "./SuperButton";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {saveState} from "../localStorage";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../state/Store";
import {ChangeValueMaxAC, ChangeValueStartAC} from "../state/counterReducer";

type PropsType = {
    table: (bool: boolean | undefined) => void
    onFocusHandler: () => void
    onBlurHandler: () => void
    changeValueCounter: () => void
}

export const Settings = React.memo( (props: PropsType) => {
    const dispatch = useDispatch()

    let valueMax = useSelector<RootReducerType, number>(state => state.counter.valueMax)
    let valueStart = useSelector<RootReducerType, number>(state => state.counter.valueStart)

    useEffect(() => {
        saveState("valueMax", valueMax)
        saveState("valueStart", valueStart)
    }, [valueMax, valueStart])

    const onChangeMax = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeValueMaxAC(+e.currentTarget.value))
    }, [ChangeValueMaxAC])

    const onChangeStart = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeValueStartAC(+e.currentTarget.value))
    }, [ChangeValueStartAC])

    const isRed = (value: number) => {
        if(value < 0) return true
        if(valueMax <= valueStart) return true
    }

    props.table(isRed(valueMax) || isRed(valueStart))

    return(
        <div className="App">
            <div className="setValues">
                <div className="setValues_max">
                    <span className="str">max value :</span>
                    <input
                        className={isRed(valueMax) ? "red" : ''}
                        value={valueMax}
                        onChange={onChangeMax}
                        onFocus={props.onFocusHandler}
                        onBlur={props.onBlurHandler}
                        type="number"
                    />
                </div>
                <div className="setValues_start">
                    <span className="str">start value :</span>
                    <input className={isRed(valueStart) ? "red" : ''}
                           value={valueStart}
                           onChange={onChangeStart}
                           onFocus={props.onFocusHandler}
                           onBlur={props.onBlurHandler}
                           type="number"
                    />
                </div>
            </div>
            <div className="set">
                <SuperButton
                    disabled={isRed(valueMax) || isRed(valueStart)}
                    className="btn"
                    title="SET"
                    callback={props.changeValueCounter}
                />
            </div>
        </div>
    )
})