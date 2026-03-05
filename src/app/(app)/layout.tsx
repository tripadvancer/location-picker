import { ReactNode } from 'react'

import { Footer } from '@/components/features/layout/footer/footer'
import { Header } from '@/components/features/layout/header/header'
import { MobileBottomNav } from '@/components/features/layout/mobile-bottom-nav/mobile-bottom-nav'

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <div className="h-full">
            <div className="relative m-auto flex min-h-full max-w-250 flex-col bg-white px-4 md:px-8">
                <Header />
                <main className="flex w-full grow py-4 pb-22 md:py-8">{children}</main>
                <Footer />
                <MobileBottomNav />
            </div>
        </div>
    )
}
