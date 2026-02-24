import InstallPWAButton from '@/components/features/layout/install-pwa-button/install-pwa-button'
import { ExternalLink } from '@/components/ui/external-link'

export const Footer = () => {
    return (
        <footer className="flex flex-col justify-between gap-y-4 border-t border-gray-300 py-4 text-sm sm:flex-row">
            <div>
                <div>
                    &copy; 2025 - 2026{' '}
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
            </div>

            <InstallPWAButton width={135} height={40} />
        </footer>
    )
}
