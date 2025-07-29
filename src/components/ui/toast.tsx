'use client'

import { ReactNode } from 'react'

import { CircleCheckIcon, CircleXIcon, XIcon } from 'lucide-react'

import { useTimeout } from '@/utils/hooks/use-timeout'

type ToastProps = {
    variant: 'success' | 'error'
    title: string
    message: string
    onClose: () => void
}

export const Toast = ({ variant, title, message, onClose }: ToastProps) => {
    useTimeout(onClose, 5000)

    return (
        <div className="relative rounded-lg bg-white p-4 pr-16 text-sm shadow-lg" onClick={onClose}>
            <div className="flex items-start gap-2">
                {variant === 'success' && (
                    <div className="text-green-400">
                        <CircleCheckIcon />
                    </div>
                )}
                {variant === 'error' && (
                    <div className="text-red-400">
                        <CircleXIcon />
                    </div>
                )}
                <div className="space-y-1 text-sm">
                    <div className="font-bold">{title}</div>
                    <div className="text-gray-500">{message}</div>
                </div>
            </div>
            <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-950" onClick={onClose}>
                <XIcon size={16} />
            </div>
        </div>
    )
}

export const ToastContainer = ({ children }: { children: ReactNode }) => {
    return <div className="fixed top-4 right-4 left-4 z-50 flex flex-col gap-4 sm:left-auto sm:w-96">{children}</div>
}
