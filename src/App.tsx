import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Settings} from "./components/Settings";
import {Counter} from "./components/Counter";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {ChangeCounterAC, ChangeIsFocusAC, ChangeValueTableAC} from "./state/counterReducer";
import {loadState} from "./localStorage";

const App = React.memo( function() {
    const dispatch = useDispatch()

    let maxValue = useSelector<RootReducerType, number>(state => state.counter.valueMax)
    let startValue = useSelector<RootReducerType, number>(state => state.counter.valueStart)
    let counter = useSelector<RootReducerType, number>(state => state.counter.counter)
    let isFocus = useSelector<RootReducerType, boolean>(state => state.counter.isFocus)
    let valueTable = useSelector<RootReducerType, string>(state => state.counter.valueTable)


    const [isView, setIsView] = useState(false)

    useEffect(() => {
        dispatch(ChangeCounterAC(startValue))
    }, [])

    const onClickHandler = useCallback( () => {
        debugger
        if (counter < maxValue) {
            dispatch(ChangeCounterAC(counter + 1))
        }
    }, [ChangeCounterAC, counter])

    const onClickReset = useCallback(() => {
        dispatch( ChangeCounterAC(startValue))
    },[ChangeCounterAC, startValue])

    const table = useCallback((bool: boolean | undefined) => {
        dispatch(ChangeValueTableAC(bool ? "Incorrect value!" : ''))
        // setValueTable(bool ? "Incorrect value!" : '')
    }, [ChangeValueTableAC])

    const focusInput = useCallback(() => {
        dispatch(ChangeIsFocusAC(true))
        // setIsFocus(true)
    }, [ChangeIsFocusAC])

    const blurInput = useCallback(() => {
        dispatch(ChangeIsFocusAC(false))
        // setIsFocus(false)
    }, [ChangeIsFocusAC])

    const onSetupCounter = useCallback(() => {
        let valueCounter = loadState("valueStart")
        dispatch( ChangeCounterAC(valueCounter))
        setIsView(false)
    }, [ChangeCounterAC])

    const changeView = useCallback(() => {
        setIsView(true)
    }, [] )

    return (
        <div className="container">
            {
                isView
                    ? <Settings
                        table={table}
                        onFocusHandler={focusInput}
                        onBlurHandler={blurInput}
                        changeValueCounter={onSetupCounter}
                    />
                    : <Counter
                        valueTable={valueTable}
                        onClickHandler={onClickHandler}
                        onClickReset={onClickReset}
                        counter={counter}
                        isFocus={isFocus}
                        changeView={changeView}
                        maxStartCounter={{
                            maxValue,
                            startValue
                        }}
                    />
            }
        </div>

    );
})

export default App;
