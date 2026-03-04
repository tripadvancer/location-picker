import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { Coordinates } from '@/utils/types'

import { ConverterResultAddress } from './components/converter-result-address'
import { ConverterResultDd } from './components/converter-result-dd'
import { ConverterResultDms } from './components/converter-result-dms'

type ConverterResultProps = {
    coordinates: Coordinates
}

export const ConverterResult = ({ coordinates }: ConverterResultProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-1 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm">
                <ConverterResultDd coordinates={coordinates} />
                <ConverterResultDms coordinates={coordinates} />
                <ConverterResultAddress coordinates={coordinates} />
            </div>
            <LocationControls coordinates={coordinates} />
        </div>
    )
}
