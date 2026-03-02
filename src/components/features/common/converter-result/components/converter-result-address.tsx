'use client'

import { useEffect, useMemo, useState } from 'react'

import useSWRMutation from 'swr/mutation'

import { useToast } from '@/components/providers/toast-provider'
import { Coordinates } from '@/utils/types'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed request')
    return res.json()
}

type ConverterResultAddressProps = {
    coordinates: Coordinates
}

export const ConverterResultAddress = ({ coordinates }: ConverterResultAddressProps) => {
    const toast = useToast()
    const [address, setAddress] = useState<string | null>(null)

    const url = useMemo(
        () => `/api/reverse-geocode?lat=${coordinates.lat}&lon=${coordinates.lng}`,
        [coordinates.lat, coordinates.lng],
    )

    const { trigger, isMutating, error } = useSWRMutation(url, fetcher)

    useEffect(() => {
        setAddress(null)
    }, [coordinates.lat, coordinates.lng])

    const handleClick = async () => {
        try {
            const result = await trigger()
            if (result?.address) {
                setAddress(result.address)
            }
        } catch {
            toast.error('Error', 'Failed to fetch address')
        }
    }

    return (
        <div>
            {!address &&
                (isMutating ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <button onClick={handleClick} className="text-blue-500 hover:underline">
                        Get address
                    </button>
                ))}

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
