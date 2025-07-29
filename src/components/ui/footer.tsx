import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="flex flex-col justify-between border-t border-gray-300 py-4 text-sm sm:flex-row">
            <div>
                &copy; 2025{' '}
                <Link
                    href="https://www.tripadvancer.com"
                    target="__blank"
                    className="inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:underline"
                >
                    Tripadvancer
                    <ExternalLinkIcon size={12} strokeWidth={2.75} />
                </Link>
            </div>

            <div>
                Powered by{' '}
                <Link
                    href="https://stadiamaps.com/"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:underline"
                >
                    Stadiamaps
                    <ExternalLinkIcon size={12} strokeWidth={2.75} />
                </Link>
            </div>
        </footer>
    )
}
