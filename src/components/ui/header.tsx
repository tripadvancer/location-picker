import { Suspense } from 'react'

import { InfoIcon } from 'lucide-react'

import Link from 'next/link'

import { Search } from '@/components/features/search/search'

import { Logo } from './logo'

export const Header = () => {
    return (
        <header className="flex items-center justify-between gap-x-12 border-b border-gray-300 py-4">
            <Logo />
            <div className="flex flex-1 items-center gap-x-4">
                <div className="hidden flex-1 sm:block">
                    <Suspense>
                        <Search />
                    </Suspense>
                </div>
                <Link href="/about" className="text-gray-500 hover:text-black">
                    <InfoIcon />
                </Link>
            </div>
        </header>
    )
}
