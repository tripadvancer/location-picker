import Link from 'next/link'

import { FaqExpander } from './components/faq-expander'

export const Faq = () => {
    return (
        <div className="space-y-4">
            <FaqExpander title="About">
                <p>
                    <strong>Location Picker</strong> is a convenient online tool for searching, converting, and sharing
                    coordinates. You can search for places by address or coordinates, easily convert between DD and DMS
                    formats, and open or share any location via Google Maps, Waze, Apple Maps, or Yandex.Maps. A simple,
                    accurate, and free solution for anyone working with geolocation.
                </p>
            </FaqExpander>

            <FaqExpander title="Use in Full Screen Mode on iPhone and Android">
                <p className="mb-4">
                    For the best experience, launch this app directly from your home screen to enjoy full-screen mode on
                    your device.
                </p>

                <h4 className="mb-2 font-bold">How to Install on iPhone</h4>
                <ol className="mb-4 list-decimal space-y-2 pl-6">
                    <li>
                        Open Safari and go to{' '}
                        <Link
                            href="https://location-picker.tripadvancer.com"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            https://location-picker.tripadvancer.com
                        </Link>
                        .
                    </li>
                    <li>Tap the "Share" button.</li>
                    <li>Select "Add to Home Screen".</li>
                    <li>Tap the Location Picker icon on your home screen to launch the app.</li>
                </ol>

                <h4 className="mb-2 font-bold">How to Install on Android</h4>
                <ol className="list-decimal space-y-2 pl-6">
                    <li>
                        Open Safari and go to{' '}
                        <Link
                            href="https://location-picker.tripadvancer.com"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            https://location-picker.tripadvancer.com
                        </Link>
                        .
                    </li>
                    <li>Tap the menu button (three dots) in the top-right corner.</li>
                    <li>Select "Add to Home Screen".</li>
                    <li>Tap the Location Picker icon on your home screen to launch the app.</li>
                </ol>
            </FaqExpander>
        </div>
    )
}
