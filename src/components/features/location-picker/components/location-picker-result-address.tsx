'use client'

import useSWRMutation from 'swr/mutation'

import { useSearchParams } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const LocationPickerResultAddress = () => {
    const searchParams = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const url = lat && lng ? `/api/reverse-geocode?lat=${lat}&lon=${lng}` : null

    const { data, error, isMutating, trigger } = useSWRMutation(url, fetcher)

    return (
        <div>
            <div onClick={() => trigger()} className="cursor-pointer text-blue-500">
                Get address
            </div>

            {isMutating && <div className="text-gray-500">Loading...</div>}

            {error && <div className="text-red-500">Error fetching address</div>}

            {!isMutating && data?.address && (
                <div>
                    <strong>Address: </strong>
                    <span>{data.address}</span>
                </div>
            )}
        </div>
    )
}
