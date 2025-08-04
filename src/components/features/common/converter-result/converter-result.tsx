import { ConverterResultAddress } from './converter-result-address'
import { ConverterResultDd } from './converter-result-dd'
import { ConverterResultDms } from './converter-result-dms'

type ConverterResultProps = {
    lat?: string | null
    lng?: string | null
}

export const ConverterResult = (props: ConverterResultProps) => {
    if (!props.lat || !props.lng) {
        return null
    }

    return (
        <div className="space-y-1 rounded-lg bg-gray-50 p-4 text-sm">
            <ConverterResultDd lat={props.lat} lng={props.lng} />
            <ConverterResultDms lat={props.lat} lng={props.lng} />
            <ConverterResultAddress lat={props.lat} lng={props.lng} />
        </div>
    )
}
