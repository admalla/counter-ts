import {SuperButton} from "./SuperButton";
import React, {FC} from "react";

type PropsType = {
    onClickHandler: () => void
    onClickReset: () => void
    counter: number
    valueTable: string | undefined
    isFocus: boolean
    changeView: () => void
    maxStartCounter: {
        maxValue: number
        startValue: number
    }
}
export const Counter: FC<PropsType> = React.memo( (
    {
        onClickHandler,
        onClickReset,
        counter,
        valueTable,
        isFocus,
        maxStartCounter,
        changeView
    }
    ) => {

    return (
        <div className="App">
            <div className={`counter ${counter === maxStartCounter.maxValue && "textRed"}`}>
                {valueTable
                    ? <span className="clTable">{valueTable}</span>
                        : isFocus
                        ? <span className="addValue">add value counter</span>
                    : counter}
            </div>
            <div className="wrapper">
                <SuperButton title={"Inc"} callback={onClickHandler} disabled={counter === maxStartCounter.maxValue} />
                <SuperButton title={"Reset"} callback={onClickReset} disabled={counter === maxStartCounter.startValue} />
                <SuperButton title={'set'} callback={changeView} />
            </div>
        </div>
    )
})