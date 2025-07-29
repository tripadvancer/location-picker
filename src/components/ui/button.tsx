'use client '

import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}

export const Button = (props: ButtonProps) => {
    const { ...rest } = props

    return (
        <button
            {...rest}
            className="cursor-pointer rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
