'use client'

import { useEffect, useState } from 'react'

import useSWRMutation from 'swr/mutation'

import { useSearchParams } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const LocationPickerResultAddress = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const [address, setAddress] = useState<string | null>(null)
    const [lastCoords, setLastCoords] = useState<string | null>(null)

    const url = lat && lng ? `/api/reverse-geocode?lat=${lat}&lon=${lng}` : null
    const { trigger, isMutating, error } = useSWRMutation(url, fetcher)

    const currentCoords = lat && lng ? `${lat},${lng}` : null

    useEffect(() => {
        if (currentCoords !== lastCoords) {
            setAddress(null)
            setLastCoords(currentCoords)
        }
    }, [currentCoords, lastCoords])

    const handleClick = async () => {
        if (!url) return
        try {
            const result = await trigger()
            if (result?.address) {
                setAddress(result.address)
            }
        } catch (err) {
            console.error('Error fetching address:', err)
            setAddress(null)
        }
    }

    return (
        <div>
            {!address && (
                <>
                    {isMutating ? (
                        <div className="text-gray-500">Loading...</div>
                    ) : (
                        <div onClick={handleClick} className="cursor-pointer text-blue-500">
                            Get address
                        </div>
                    )}
                </>
            )}

            {error && <div className="text-red-500">Error fetching address</div>}

            {address && !isMutating && (
                <div>
                    <strong>Address: </strong>
                    <span>{address}</span>
                </div>
            )}
        </div>
    )
}
