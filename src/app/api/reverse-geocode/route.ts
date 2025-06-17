import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!lat || !lon) {
        return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 })
    }

    try {
        const apiKey = process.env.LOCATIONIQ_API_KEY
        const apiUrl = process.env.LOCATIONIQ_API_URL

        const url = `${apiUrl}/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&normalizeaddress=1&oceans=1&format=json`

        const geoRes = await fetch(url)

        if (!geoRes.ok) {
            console.error('Geocoding API failed:', geoRes.statusText)
            return NextResponse.json({ error: 'Failed to fetch address' }, { status: 502 })
        }

        const data = await geoRes.json()

        return NextResponse.json({ address: data.display_name })
    } catch (err) {
        console.error('Reverse geocoding error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
