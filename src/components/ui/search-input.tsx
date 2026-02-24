'use client'

import { ChangeEvent } from 'react'

import { RadarIcon, SearchIcon, XIcon } from 'lucide-react'

type SearchInputProps = {
    value: string
    placeholder: string
    variant?: 'gray' | 'white'
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const SearchInput = (props: SearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    const baseClasses = 'flex h-10 items-center rounded-lg'
    const variantClasses = props.variant === 'white' ? 'bg-white border border-gray-200' : 'bg-gray-100' // default gray

    return (
        <div className={`${baseClasses} ${variantClasses}`}>
            <div className="flex size-10 shrink-0 items-center justify-center">
                {props.isLoading ? (
                    <RadarIcon className="animate-spin" size={20} strokeWidth={1.5} />
                ) : (
                    <SearchIcon size={20} strokeWidth={1.5} />
                )}
            </div>

            <div className="h-full w-full shrink">
                <input
                    type="text"
                    name="search"
                    value={props.value}
                    autoComplete="off"
                    autoFocus
                    className="h-full w-full bg-transparent text-sm placeholder:text-gray-600 focus:outline-none"
                    placeholder={props.placeholder}
                    onClick={props.onClick}
                    onChange={handleChange}
                />
            </div>

            {props.value && (
                <div
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-gray-300 hover:text-gray-950"
                    onClick={props.onClear}
                >
                    <XIcon size={20} />
                </div>
            )}
        </div>
    )
}
