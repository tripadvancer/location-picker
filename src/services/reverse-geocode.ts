import { Coordinates } from '@/utils/types/common.types'

type ReverseGeocodeParams = Coordinates

type ReverseGeocodeResponse = {
    address: string
}

export async function reverseGeocode(coordinates: ReverseGeocodeParams): Promise<ReverseGeocodeResponse> {
    const params = new URLSearchParams({
        lat: coordinates.lat.toString(),
        lon: coordinates.lng.toString(),
    })

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/reverse-geocode?${params.toString()}`
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
