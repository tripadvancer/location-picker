import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const lat = searchParams.get('lat')
        const lon = searchParams.get('lon')
        const apiKey = process.env.LOCATIONIQ_API_KEY
        const apiUrl = process.env.LOCATIONIQ_API_URL

        if (!lat || !lon || !apiKey || !apiUrl) {
            return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 })
        }

        const params = new URLSearchParams({
            key: apiKey,
            lat,
            lon,
            normalizeaddress: '1',
            oceans: '1',
            format: 'json',
        })

        const url = `${apiUrl}/reverse.php?${params.toString()}`
        const res = await fetch(url)

        if (!res.ok) {
            console.error('Reverse geocoding fetch failed:', res.statusText)
            return NextResponse.json({ error: 'Failed to fetch address' }, { status: 502 })
        }

        const data = await res.json()

        return NextResponse.json({ address: data.display_name })
    } catch (err) {
        console.error('Reverse geocoding error:', err)
        return NextResponse.json({ error: 'Unexpected error in reverse geocoding' }, { status: 500 })
    }
}
