import { Suspense } from 'react'

import { Search } from '@/components/features/search/search'

import { Logo } from './logo'

export const Header = () => {
    return (
        <header className="flex items-center justify-between gap-x-12 border-b border-gray-300 py-4">
            <Logo />
            <div className="hidden flex-1 sm:block">
                <Suspense>
                    <Search />
                </Suspense>
            </div>
        </header>
    )
}
