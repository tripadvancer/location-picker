'use client'

function toDMS(deg: number, isLat: boolean) {
    const absolute = Math.abs(deg)
    const degrees = Math.floor(absolute)
    const minutesFull = (absolute - degrees) * 60
    const minutes = Math.floor(minutesFull)
    const seconds = (minutesFull - minutes) * 60

    const direction = isLat ? (deg >= 0 ? 'N' : 'S') : deg >= 0 ? 'E' : 'W'

    return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`
}

type CoordinateConverterResultDmsProps = {
    lat: string
    lng: string
}

export const CoordinateConverterResultDms = (props: CoordinateConverterResultDmsProps) => {
    const latNum = parseFloat(props.lat)
    const lngNum = parseFloat(props.lng)

    if (isNaN(latNum) || isNaN(lngNum)) {
        return null
    }

    return (
        <div>
            <strong>DMS: </strong>
            <span>
                {toDMS(latNum, true)} {toDMS(lngNum, false)}{' '}
            </span>
        </div>
    )
}
