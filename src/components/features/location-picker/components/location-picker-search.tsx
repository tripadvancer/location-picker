'use client'

import { useState } from 'react'

import { LocationPickerSearchInput } from './location-picker-search-input'

export const LocationPickerSearch = () => {
    const [value, setValue] = useState<string>('')

    return (
        <div className="rounded-lg bg-white shadow-black sm:w-1/2">
            <LocationPickerSearchInput
                value={value}
                isLoading={false}
                onChange={setValue}
                onClear={() => setValue('')}
                onClick={() => {}}
            />
        </div>
    )
}
