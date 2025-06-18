'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

import useSWR from 'swr'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'

import { useRouter, useSearchParams } from 'next/navigation'

import { SearchItem } from '@/utils/types'

import { LocationPickerSearchInput } from './location-picker-search-input'

type SearchResponse = {
    items: SearchItem[]
}

const fetcher = async (url: string): Promise<SearchResponse> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export const LocationPickerSearch = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState('')
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false)
    const [debouncedValue] = useDebounceValue(value, 500)

    const ref = useRef<HTMLDivElement>(null)

    const { data, error, isLoading } = useSWR<SearchResponse>(
        debouncedValue.length >= 2 ? `/api/search?q=${encodeURIComponent(debouncedValue)}` : null,
        fetcher,
    )

    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsAutocompleteVisible(false)
    })

    useEffect(() => {
        if (data?.items?.length) {
            setIsAutocompleteVisible(true)
        } else {
            setIsAutocompleteVisible(false)
        }
    }, [data])

    const handleSelectItem = (item: SearchItem) => {
        if (item.coordinates) {
            const { lat, lng } = item.coordinates
            const zoom = 12

            const currentParams = new URLSearchParams(searchParams.toString())
            currentParams.set('lat', lat.toString())
            currentParams.set('lng', lng.toString())
            currentParams.set('zoom', zoom.toString())

            router.replace(`/?${currentParams.toString()}`)

            setIsAutocompleteVisible(false)
        }
    }

    const handleInputClear = () => {
        setValue('')
        setIsAutocompleteVisible(false)
    }

    const handleInputClick = () => {
        if (data?.items?.length) {
            setIsAutocompleteVisible(true)
        }
    }

    return (
        <div ref={ref} className="rounded-lg bg-white shadow-black sm:w-1/2">
            <LocationPickerSearchInput
                value={value}
                isLoading={isLoading}
                onChange={setValue}
                onClear={handleInputClear}
                onClick={handleInputClick}
            />

            {isAutocompleteVisible && (
                <div className="px-1 pb-1">
                    {data?.items.map((item, index) => (
                        <div
                            key={`search-item-${index}`}
                            className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100"
                            onClick={() => handleSelectItem(item)}
                        >
                            <div className="line-clamp-1 text-sm break-words">{item.title}</div>
                            <div className="line-clamp-2 break-words text-gray-500">{item.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
