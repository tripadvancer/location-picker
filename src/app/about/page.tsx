import { Metadata } from 'next'

import { About } from '@/components/features/about/about'

// prettier-ignore
export const metadata: Metadata = {
    title: 'About Location Picker',
    description: 'Learn more about Location Picker, a free online tool for searching, converting, and sharing locations by address or coordinates.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Location Picker',
    },
}

export default function AboutPage() {
    return <About />
}
