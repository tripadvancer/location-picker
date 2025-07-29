import { LocationPickerResultAddress } from './location-picker-result-address'
import { LocationPickerResultDd } from './location-picker-result-dd'
import { LocationPickerResultDms } from './location-picker-result-dms'

export const LocationPickerResult = () => {
    return (
        <div className="space-y-1 rounded-lg bg-gray-50 p-4 text-sm">
            <LocationPickerResultDd />
            <LocationPickerResultDms />
            <LocationPickerResultAddress />
        </div>
    )
}
