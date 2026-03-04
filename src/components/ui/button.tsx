'use client '

import { ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: 'major' | 'minor'
    className?: string
}

export const Button = (props: ButtonProps) => {
    const { ...rest } = props

    return (
        <button
            {...rest}
            className={classNames(
                'h-12 cursor-pointer rounded-xl px-4 text-sm',
                { 'bg-orange-500 text-white hover:bg-orange-400': props.variant === 'major' },
                { 'bg-gray-200 hover:bg-gray-300': props.variant === 'minor' },
                props.className,
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
