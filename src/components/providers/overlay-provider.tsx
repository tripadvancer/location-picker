'use client'

import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Dialog } from '@/components/ui/dialog'
import { useIsMobile } from '@/utils/hooks/use-is-mobile'

interface OverlayContextInterface {
    open(content: ReactNode): void
    close(): void
}

const OverlayContext = createContext<OverlayContextInterface | undefined>(undefined)

export const useOverlay = () => {
    const ctx = useContext(OverlayContext)
    if (!ctx) throw new Error('useOverlay must be used inside OverlayProvider')
    return ctx
}

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>(null)
    const isMobile = useIsMobile()

    const open = useCallback((node: ReactNode) => {
        setContent(node)
    }, [])

    const close = useCallback(() => {
        setContent(null)
    }, [])

    return (
        <OverlayContext.Provider value={{ open, close }}>
            {children}

            {content &&
                (isMobile ? (
                    <BottomSheet content={content} onClose={close} />
                ) : (
                    <Dialog content={content} onClose={close} />
                ))}
        </OverlayContext.Provider>
    )
}
