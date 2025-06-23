import { InfoIcon } from 'lucide-react'

export const LocationPickerInfo = () => {
    return (
        <div className="flex items-center gap-x-2 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <InfoIcon />
            <p>
                We&nbsp;don&rsquo;t store your location data, all <strong>data is&nbsp;processed locally</strong>.
            </p>
        </div>
    )
}
