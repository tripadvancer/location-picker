import { ButtonHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode
    className?: string
}

export const Button = (props: ButtonProps) => {
    const { className, ...rest } = props

    return (
        <button
            {...rest}
            className={classNames(
                'h-10 cursor-pointer rounded-lg bg-blue-500 px-6 font-medium whitespace-nowrap text-white hover:bg-blue-600 focus:outline-none',
                className,
            )}
            onClick={props.onClick}
        >
            <span className="flex items-center justify-center gap-x-2">
                {props.icon}
                {props.children}
            </span>
        </button>
    )
}
