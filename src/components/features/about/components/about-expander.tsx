'use client'

import { useState } from 'react'

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
                className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-4 font-bold transition-colors hover:bg-gray-200"
                onClick={toggleOpen}
            >
                <h3>{title}</h3>
                <div className="text-gray-300">{isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}</div>
            </div>
            {isOpen && <div className="py-4 sm:px-2">{children}</div>}
        </div>
    )
}
