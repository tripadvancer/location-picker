import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const q = searchParams.get('q')
        const apiKey = process.env.LOCATIONIQ_API_KEY
        const apiUrl = process.env.LOCATIONIQ_API_URL

        if (!q || !apiKey || !apiUrl) {
            return NextResponse.json({ items: [], error: 'Missing query parameter "q"' }, { status: 400 })
        }

        const params = new URLSearchParams({
            key: apiKey,
            q,
            limit: '5',
            format: 'json',
        })

        const url = `${apiUrl}/autocomplete.php?${params.toString()}`
        const res = await fetch(url)

        if (!res.ok) {
            console.error('Autocomplete fetch failed:', res.statusText)
            return NextResponse.json({ error: 'Failed to fetch address' }, { status: 502 })
        }

        const data = await res.json()

        return NextResponse.json(
            {
                items: data.map((item: { display_place: string; display_name: string; lat: string; lon: string }) => ({
                    title: item.display_place,
                    description: item.display_name,
                    coordinates: {
                        lat: item.lat,
                        lng: item.lon,
                    },
                })),
                error: null,
            },
            { status: 200 },
        )
    } catch (err) {
        console.error('Autocomplete error:', err)
        return NextResponse.json({ error: 'Unexpected error in autocomplete' }, { status: 500 })
    }
}
