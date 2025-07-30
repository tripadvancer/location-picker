import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

import { ExternalLink } from './external-link'

export const Footer = () => {
    return (
        <footer className="flex flex-col justify-between border-t border-gray-300 py-4 text-sm sm:flex-row">
            <div>
                &copy; 2025{' '}
                <ExternalLink
                    href="https://www.tripadvancer.com"
                    className="inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:underline"
                >
                    Tripadvancer
                </ExternalLink>
            </div>

            <div>
                Powered by{' '}
                <ExternalLink
                    href="https://stadiamaps.com/"
                    className="inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:underline"
                >
                    Stadiamaps
                </ExternalLink>
            </div>
        </footer>
    )
}
