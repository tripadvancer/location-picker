'use client '

import { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
}

export const Button = (props: ButtonProps) => {
    const { ...rest } = props

    return (
        <button
            {...rest}
            className={classNames(
                'h-10 cursor-pointer rounded-lg bg-gray-200 px-4 text-sm hover:bg-gray-300',
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
