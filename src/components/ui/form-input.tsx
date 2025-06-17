'use client'

import { InputHTMLAttributes } from 'react'

import classNames from 'classnames'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}

export const Input = (props: InputProps) => {
    const { className, ...rest } = props

    return (
        <div
            className={classNames(
                'relative h-10 w-full rounded-lg border border-gray-300 bg-white text-sm hover:border-gray-400 has-[:focus]:border-gray-400',
                className,
                {
                    'cursor-no-drop opacity-30': props.disabled,
                },
            )}
        >
            <input {...rest} className="h-full w-full rounded-lg bg-transparent px-4 focus:outline-none" />
        </div>
    )
}
