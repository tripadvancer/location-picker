import Image from 'next/image'

import { ExternalLink } from '@/components/ui/external-link'

import { AboutExpander } from './components/about-expander'

export const About = () => {
    return (
        <div className="space-y-4">
            <p className="mb-8">
                <strong>Location Picker</strong> is&nbsp;a&nbsp;convenient online tool for searching, converting, and
                sharing coordinates. You can search for places by&nbsp;address or&nbsp;coordinates, easily convert
                between&nbsp;DD and DMS formats, and open or&nbsp;share any location via Google Maps, Waze, Apple Maps,
                or&nbsp;Yandex.Maps.
                <br />
                <br />
                A&nbsp;simple, accurate, and free solution for anyone working with geolocation.
            </p>

            <AboutExpander title="Intro">
                <div className="space-y-4">
                    <p>Hey everyone!</p>
                    <p>
                        So, it&nbsp;turns out my&nbsp;wife and&nbsp;I spend a&nbsp;lot of&nbsp;time driving and
                        traveling through different countries. Each time, we&nbsp;have to&nbsp;use different navigation
                        apps because every country has its own favorites that work best there. For&nbsp;me, switching
                        between apps is&nbsp;easy, but for my&nbsp;wife&mdash;who&rsquo;s not really into tech&mdash;it
                        can be&nbsp;tricky. She usually asks me&nbsp;to&nbsp;send her the destination
                        in&nbsp;a&nbsp;message&nbsp;&mdash;&nbsp;not just the location, but a&nbsp;link that opens the
                        right navigation app with the route ready to&nbsp;go.
                    </p>
                    <p>
                        I&nbsp;used to&nbsp;do&nbsp;this through the web versions of&nbsp;navigation apps, but
                        that&rsquo;s not always convenient or&nbsp;quick.
                    </p>
                    <p>
                        So, I&nbsp;quickly put together a&nbsp;small app that helps find the right spot, adjust
                        it&nbsp;if&nbsp;needed, and generate a&nbsp;link for the navigation app you want. I&rsquo;ve
                        been using it&nbsp;for about six months now, and it&rsquo;s super handy!
                    </p>
                    <p>
                        I&nbsp;wanted to&nbsp;share it&nbsp;with you all&mdash;maybe someone else will find
                        it&nbsp;useful too.
                    </p>
                    <p>
                        Thanks so&nbsp;much! I&rsquo;d really appreciate any{' '}
                        <ExternalLink href="https://www.producthunt.com/products/location-picker">
                            feedback
                        </ExternalLink>
                        .
                    </p>
                </div>
            </AboutExpander>

            <AboutExpander title="Use in Full Screen Mode on iPhone and Android">
                <div className="flex items-center space-x-4">
                    <div className="hidden w-1/3 shrink-0 sm:block">
                        <Image
                            src="/images/about/full-screen.jpg"
                            alt="Full Screen Mode"
                            width={800}
                            height={1334}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <p className="mb-6">
                            For the best experience, launch this app directly from your home screen to&nbsp;enjoy
                            full-screen mode on your device.
                        </p>

                        <h4 className="mb-2 font-bold">How to Install on iPhone</h4>
                        <ol className="mb-6 list-decimal space-y-2 pl-6">
                            <li>
                                Open Safari and go to{' '}
                                <ExternalLink href="https://location-picker.tripadvancer.com">
                                    https://location-picker.tripadvancer.com
                                </ExternalLink>
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
                                <ExternalLink href="https://location-picker.tripadvancer.com">
                                    https://location-picker.tripadvancer.com
                                </ExternalLink>
                                .
                            </li>
                            <li>Tap the menu button (three dots) in&nbsp;the top-right corner.</li>
                            <li>Select &laquo;Add to&nbsp;Home Screen&raquo;.</li>
                            <li>Tap the Location Picker icon on&nbsp;your home screen to&nbsp;launch the app.</li>
                        </ol>
                    </div>
                </div>
            </AboutExpander>

            <AboutExpander title="Follow me">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        <ExternalLink href="https://x.com/oskolsky_maxim">X (Twitter)</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.linkedin.com/in/oskolsky">Linked In</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.tripadvancer.com/users/oskolsky">Tripadvancer</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://github.com/oskolsky">Github</ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="mailto:oskolsky.maxim@gmail.com">Email</ExternalLink>
                    </li>
                </ul>
            </AboutExpander>
        </div>
    )
}
