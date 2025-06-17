import { LocationPickerResultAddress } from './location-picker-result-address'
import { LocationPickerResultDd } from './location-picker-result-dd'
import { LocationPickerResultDms } from './location-picker-result-dms'

export const LocationPickerResult = () => {
    return (
        <div className="flex flex-col gap-y-2 text-sm sm:text-base">
            <LocationPickerResultDd />
            <LocationPickerResultDms />
            <LocationPickerResultAddress />
        </div>
    )
}
