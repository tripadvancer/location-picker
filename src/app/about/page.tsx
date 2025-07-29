import { Metadata } from 'next'

import { About } from '@/components/features/about/about'

// prettier-ignore
export const metadata: Metadata = {
    title: 'About Location Picker',
    openGraph: {
        title: 'About Location Picker',
    },
}

export default function AboutPage() {
    return <About />
}
