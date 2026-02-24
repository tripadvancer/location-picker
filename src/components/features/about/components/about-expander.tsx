'use client'

import { useState } from 'react'

import classNames from 'classnames'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

type AboutExpanderProps = {
    title: string
    children: React.ReactNode
}

export const AboutExpander = ({ title, children }: AboutExpanderProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div
                className={classNames(
                    'group flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100',
                    {
                        'bg-gray-100': isOpen,
                    },
                )}
                onClick={toggleOpen}
            >
                <h3>{title}</h3>
                <div
                    className={classNames('text-gray-300 group-hover:text-gray-950', {
                        'text-gray-950': isOpen,
                    })}
                >
                    {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </div>
            </div>
            {isOpen && <div className="py-4 sm:px-2">{children}</div>}
        </div>
    )
}
