'use client'

import { Suspense, useState } from 'react'

import { MenuIcon, XIcon } from 'lucide-react'

import { Search } from '@/components/features/search/search'
import { Logo } from '@/components/ui/logo'

import { HeaderMenu } from './components/header-menu'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openMobileMenu = () => {
        setIsOpen(true)
    }

    const closeMobileMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <header className="z-50 flex items-center justify-between gap-x-12 border-b border-gray-300 bg-white py-4">
                <Logo />

                <div className="flex flex-1 items-center gap-x-4">
                    <div className="hidden flex-1 sm:block">
                        <Suspense>
                            <Search />
                        </Suspense>
                    </div>

                    <div className="cursor-pointer text-gray-500 hover:text-gray-950">
                        {isOpen ? <XIcon onClick={closeMobileMenu} /> : <MenuIcon onClick={openMobileMenu} />}
                    </div>
                </div>
            </header>
            {isOpen && <HeaderMenu closeMobileMenu={closeMobileMenu} />}
        </>
    )
}
