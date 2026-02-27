import { ReactNode } from 'react'

import { XIcon } from 'lucide-react'
import { useScrollLock } from 'usehooks-ts'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type DialogProps = {
    content: ReactNode
    onClose: () => void
}

export const Dialog = ({ content, onClose }: DialogProps) => {
    useScrollLock()
    useKeypress(Keys.ESCAPE, onClose)

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-16">
            {/* Overlay */}
            <div onClick={onClose} className="fixed inset-0 z-40 bg-gray-950 opacity-50" />

            <div className="flex min-h-full items-center justify-center">
                <div className="relative z-50 w-full rounded-2xl bg-white p-8 shadow-lg sm:w-auto sm:p-12">
                    <div
                        className="absolute top-4 right-3 z-50 cursor-pointer text-gray-300 hover:text-gray-950 sm:right-4"
                        onClick={onClose}
                    >
                        <XIcon />
                    </div>

                    {content}
                </div>
            </div>
        </div>
    )
}
