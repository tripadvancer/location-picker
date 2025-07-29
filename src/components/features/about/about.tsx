import Link from 'next/link'

import { AboutExpander } from './components/about-expander'

export const About = () => {
    return (
        <div className="space-y-4">
            <p className="mb-8">
                <strong>Location Picker</strong> is&nbsp;a&nbsp;convenient online tool for searching, converting, and
                sharing coordinates. You can search for places by&nbsp;address or&nbsp;coordinates, easily convert
                between&nbsp;DD and DMS formats, and open or&nbsp;share any location via Google Maps, Waze, Apple Maps,
                or&nbsp;Yandex.Maps. A&nbsp;simple, accurate, and free solution for anyone working with geolocation.
            </p>

            <AboutExpander title="Use in Full Screen Mode on iPhone and Android">
                <p className="mb-4">
                    For the best experience, launch this app directly from your home screen to&nbsp;enjoy full-screen
                    mode on your device.
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
                    <li>Tap the &laquo;Share&raquo; button.</li>
                    <li>Select &laquo;Add to&nbsp;Home Screen&raquo;.</li>
                    <li>Tap the Location Picker icon on&nbsp;your home screen to&nbsp;launch the app.</li>
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
                    <li>Tap the menu button (three dots) in&nbsp;the top-right corner.</li>
                    <li>Select &laquo;Add to&nbsp;Home Screen&raquo;.</li>
                    <li>Tap the Location Picker icon on&nbsp;your home screen to&nbsp;launch the app.</li>
                </ol>
            </AboutExpander>

            <AboutExpander title="Follow me">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        <Link
                            href="https://x.com/oskolsky_maxim"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                        >
                            X (Twitter)
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.linkedin.com/in/oskolsky"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                        >
                            Linked In
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://www.tripadvancer.com/users/oskolsky"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                        >
                            Tripadvancer
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://github.com/oskolsky"
                            className="text-blue-500 hover:underline"
                            target="_blank"
                        >
                            Github
                        </Link>
                    </li>
                </ul>
            </AboutExpander>
        </div>
    )
}
