import Image from 'next/image'
import Link from 'next/link'

export const Landing = () => {
    return (
        <main className="wrapper flex min-h-full w-full shrink flex-col items-center justify-center gap-y-8 bg-white p-12">
            <div className="flex flex-col items-center gap-8 text-center md:max-w-250 lg:flex-row lg:text-left">
                <Image src="/images/about/full-screen.jpg" alt="Location Picker" width={400} height={667} />
                <div>
                    <h1 className="mb-6 text-4xl font-extrabold text-nowrap text-gray-950 md:text-5xl">
                        Location <span className="text-orange-500">Picker</span>
                    </h1>
                    <p className="mb-8 text-lg text-gray-700 md:text-xl">
                        Search, store, and share locations instantly. Save your spots in a flash and open them anytime
                        in <strong>Google Maps</strong>, <strong>Waze</strong>, <strong>Apple Maps</strong>, or{' '}
                        <strong>Yandex.Maps</strong>.
                    </p>
                    <div>
                        <Link
                            href="/"
                            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl bg-orange-500 px-12 align-top text-sm font-semibold text-white hover:bg-orange-400"
                        >
                            Let's Start
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
