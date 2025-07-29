'use client'

import { ChangeEvent } from 'react'

import { RadarIcon, SearchIcon, XIcon } from 'lucide-react'

type SearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const SearchInput = (props: SearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="flex h-10 items-center rounded-lg bg-gray-100">
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
                    placeholder="Enter location or coordinates"
                    onClick={props.onClick}
                    onChange={handleChange}
                />
            </div>

            {props.value && (
                <div
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-gray-300 hover:text-black"
                    onClick={props.onClear}
                >
                    <XIcon size={20} />
                </div>
            )}
        </div>
    )
}
