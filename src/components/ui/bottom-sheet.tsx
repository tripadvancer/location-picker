'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

type BottomSheetProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
    const [translateY, setTranslateY] = useState(0)
    const startY = useRef<number | null>(null)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
    }, [isOpen])

    // swipe to close
    const handleTouchStart = (e: React.TouchEvent) => (startY.current = e.touches[0].clientY)
    const handleTouchMove = (e: React.TouchEvent) => {
        if (startY.current === null) return
        const diff = e.touches[0].clientY - startY.current
        if (diff > 0) setTranslateY(diff)
    }
    const handleTouchEnd = () => {
        if (translateY > 120) onClose()
        setTranslateY(0)
        startY.current = null
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={classNames(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
            />

            {/* Sheet */}
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateY(${isOpen ? translateY : 1000}px)`,
                    transition: translateY === 0 ? 'transform 300ms ease' : 'none',
                }}
                className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl"
            >
                {/* Drag handle */}
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

                {children}
            </div>
        </>
    )
}
