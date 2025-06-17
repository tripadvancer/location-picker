import { ReverseGeocodeParams, ReverseGeocodeResponse } from './reverse-geocode.types'

export async function reverseGeocode({ lat, lng }: ReverseGeocodeParams): Promise<ReverseGeocodeResponse> {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
    })

    const url = '/api/reverse-geocode?' + params.toString()
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
