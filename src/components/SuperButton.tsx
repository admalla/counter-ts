import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode} from "react";

type DefaultButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonType = DefaultButtonType & {
    title: string
    callback: () => void
    disabled?: boolean
    children?: ReactNode
}
export const SuperButton: FC<SuperButtonType> = ({title, callback, ...restProps}) => {
    return (
        <button
            onClick={callback}
            {...restProps}
        >{title}</button>
    )
}