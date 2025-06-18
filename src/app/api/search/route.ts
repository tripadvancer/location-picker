import { NextResponse } from 'next/server'

import { CoordinateFormat } from '@/utils/common.enums'
import { convertDMStoDD, detectCoordinateFormat, parseDDCoordinates } from '@/utils/geo.helpers'

import { handleCoordinates } from './search.helpers'

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')

    if (!q) {
        return NextResponse.json({ items: [], error: 'Missing query parameter "q"' }, { status: 400 })
    }

    const coordinateFormat = detectCoordinateFormat(q)

    switch (coordinateFormat) {
        case CoordinateFormat.DD: {
            const coordinates = parseDDCoordinates(q)
            if (coordinates) return handleCoordinates(coordinates)
            break
        }
        case CoordinateFormat.DMS: {
            const coordinates = convertDMStoDD(q)
            if (coordinates) return handleCoordinates(coordinates)
            break
        }

        default:
            break
    }

    return NextResponse.json({ items: [] })
}
