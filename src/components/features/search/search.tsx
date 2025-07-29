'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

import { MapPinIcon } from 'lucide-react'
import useSWR from 'swr'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'

import { useRouter, useSearchParams } from 'next/navigation'

import { SearchItem } from '@/utils/types'

import { SearchInput } from './search-input'

type SearchResponse = {
    items: SearchItem[]
}

const fetcher = async (url: string): Promise<SearchResponse> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export const Search = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState('')
    const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false)
    const [debouncedValue] = useDebounceValue(value, 500)

    const ref = useRef<HTMLDivElement>(null)

    const { data, isLoading } = useSWR<SearchResponse>(
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
        <div ref={ref} className="relative w-full">
            <SearchInput
                value={value}
                isLoading={isLoading}
                onChange={setValue}
                onClear={handleInputClear}
                onClick={handleInputClick}
            />

            {isAutocompleteVisible && (
                <div className="absolute top-full right-0 left-0 z-10 rounded-lg bg-white p-1 shadow-lg">
                    {data?.items.map((item, index) => (
                        <div
                            key={`search-item-${index}`}
                            className="flex cursor-pointer gap-x-2.5 rounded-md px-2 py-1 hover:bg-gray-50"
                            onClick={() => handleSelectItem(item)}
                        >
                            <MapPinIcon size={16} className="mt-0.5 w-4 shrink-0 text-gray-400" />

                            <div>
                                <div className="line-clamp-1 text-sm break-words">{item.title}</div>
                                <div className="line-clamp-2 text-xs break-words text-gray-400">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
