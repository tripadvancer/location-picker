'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { InstallPWAButton } from '@/components/features/common/install-pwa-button/install-pwa-button'
import { Button } from '@/components/ui/button'

export const Landing = () => {
    const router = useRouter()

    return (
        <div className="flex h-full flex-1 items-center justify-between gap-x-15 bg-white px-16">
            <div className="hidden w-1/2 justify-end md:flex">
                <Image src="/images/about/full-screen.jpg" alt="Location Picker" width={400} height={667} />
            </div>

            <section className="space-y-6 text-center md:w-1/2 md:text-left">
                <h1 className="text-4xl font-extrabold text-nowrap text-gray-950 md:text-5xl">Location Picker</h1>
                <p className="text-lg text-gray-700 md:text-xl">
                    Search, store, and share locations instantly. Save your spots in a flash and open them anytime in{' '}
                    <strong>Google Maps</strong>, <strong>Waze</strong>, <strong>Apple Maps</strong>, or{' '}
                    <strong>Yandex.Maps</strong>.
                </p>

                <Button
                    variant="major"
                    className="bg-gray-900 font-semibold text-white hover:bg-gray-950"
                    onClick={() => router.push('/')}
                >
                    Let's Start
                </Button>
            </section>
        </div>
    )
}
