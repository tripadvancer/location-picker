import { MapPinIcon } from 'lucide-react'

import { LocationPickerResultAddress } from './location-picker-result-address'
import { LocationPickerResultDd } from './location-picker-result-dd'
import { LocationPickerResultDms } from './location-picker-result-dms'

export const LocationPickerResult = () => {
    return (
        <div className="flex gap-x-2 rounded-lg bg-gray-50 p-4">
            <MapPinIcon className="text-gray-400" />
            <div className="flex flex-col text-sm">
                <LocationPickerResultDd />
                <LocationPickerResultDms />
                <LocationPickerResultAddress />
            </div>
        </div>
    )
}
