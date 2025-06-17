'use client'

import { ChangeEvent } from 'react'

import { RadarIcon, SearchIcon, XIcon } from 'lucide-react'

type LocationPickerSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const LocationPickerSearchInput = (props: LocationPickerSearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="flex h-10">
            <div className="flex size-10 shrink-0 items-center justify-center">
                {props.isLoading ? <RadarIcon className="animate-spin" /> : <SearchIcon size={16} />}
            </div>

            <div className="h-full w-full shrink">
                <input
                    type="text"
                    name="search"
                    value={props.value}
                    autoComplete="off"
                    autoFocus
                    className="h-full w-full bg-transparent text-sm focus:outline-none"
                    placeholder="Enter location or coordinates"
                    onClick={props.onClick}
                    onChange={handleChange}
                />
            </div>

            {props.value && (
                <div
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-gray-500 hover:text-blue-500"
                    onClick={props.onClear}
                >
                    <XIcon size={16} />
                </div>
            )}
        </div>
    )
}
