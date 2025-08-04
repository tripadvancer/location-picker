'use client'

type CoordinateConverterResultDdProps = {
    lat: string
    lng: string
}

export const ConverterResultDd = (props: CoordinateConverterResultDdProps) => {
    return (
        <div>
            <strong>DD: </strong>
            <span>{`${parseFloat(props.lat).toFixed(6)}, ${parseFloat(props.lng).toFixed(6)}`} </span>
        </div>
    )
}
