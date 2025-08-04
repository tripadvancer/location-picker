import { CoordinateConverterResultAddress } from './coordinate-converter-result-address'
import { CoordinateConverterResultDd } from './coordinate-converter-result-dd'
import { CoordinateConverterResultDms } from './coordinate-converter-result-dms'

type CoordinateConverterResultProps = {
    lat?: string | null
    lng?: string | null
}

export const CoordinateConverterResult = (props: CoordinateConverterResultProps) => {
    if (!props.lat || !props.lng) {
        return null
    }

    return (
        <div className="space-y-1 rounded-lg bg-gray-50 p-4 text-sm">
            <CoordinateConverterResultDd lat={props.lat} lng={props.lng} />
            <CoordinateConverterResultDms lat={props.lat} lng={props.lng} />
            <CoordinateConverterResultAddress lat={props.lat} lng={props.lng} />
        </div>
    )
}
