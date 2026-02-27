'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type BottomSheetProps = {
    content: ReactNode
    onClose: () => void
}

export const BottomSheet = ({ content, onClose }: BottomSheetProps) => {
    const [visible, setVisible] = useState(false)
    const [translateY, setTranslateY] = useState(0)

    useKeypress(Keys.ESCAPE, onClose)

    const startY = useRef<number | null>(null)

    useEffect(() => {
        requestAnimationFrame(() => {
            setVisible(true)
        })

        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    const closeWithAnimation = () => {
        setVisible(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startY.current === null) return
        const diff = e.touches[0].clientY - startY.current
        if (diff > 0) setTranslateY(diff)
    }

    const handleTouchEnd = () => {
        if (translateY > 120) {
            closeWithAnimation()
        }
        setTranslateY(0)
        startY.current = null
    }

    return (
        <>
            <div
                onClick={closeWithAnimation}
                className={classNames(
                    'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
                    visible ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
            />

            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateY(${visible ? translateY : 1000}px)`,
                    transition: translateY === 0 ? 'transform 300ms ease' : 'none',
                }}
                className="fixed right-0 bottom-0 left-0 z-50 rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl"
            >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
                {content}
            </div>
        </>
    )
}
