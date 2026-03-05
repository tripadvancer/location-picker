import { BugIcon } from 'lucide-react'

import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="wrapper flex min-h-full w-full shrink flex-col items-center justify-center gap-y-8">
            <div className="flex flex-col gap-y-8 text-center">
                <BugIcon size={128} className="m-auto" />
                <h1 className="text-2xl font-bold">Page not found</h1>
                <p>
                    It may have been moved,
                    <br />
                    or you may have entered the page address incorrectly.
                </p>
            </div>

            <Link
                href="/"
                className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-orange-500 px-8 text-sm text-white hover:bg-orange-400"
            >
                Go to Home
            </Link>
        </div>
    )
}
