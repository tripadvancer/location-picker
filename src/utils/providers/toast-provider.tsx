'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

import { Toast, ToastContainer } from '@/components/ui/toast'

interface ToastInterface {
    id: number
    variant: 'success' | 'error'
    title: string
    message: string
}

interface ToastContextInterface {
    success: (title: string, message: string) => void
    error: (title: string, message: string) => void
}

type ToastProviderProps = {
    children: ReactNode
}

const defaultValues: ToastContextInterface = {
    success: () => {},
    error: () => {},
}

export const ToastContext = createContext(defaultValues)

export function useToast(): ToastContextInterface {
    const context = useContext(ToastContext)

    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return context
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToastInterface[]>([])

    const success = (title: string, message: string) => {
        const id = Date.now()
        const variant = 'success'
        setToasts((currentToasts: ToastInterface[]) => [...currentToasts, { id, title, message, variant }])
    }

    const error = (title: string, message: string) => {
        const id = Date.now()
        const variant = 'error'
        setToasts((currentToasts: ToastInterface[]) => [...currentToasts, { id, title, message, variant }])
    }

    const close = (id: number) =>
        setToasts((currentToasts: ToastInterface[]) => currentToasts.filter((toast: ToastInterface) => toast.id !== id))

    const contextValue = useMemo(() => ({ success, error }), [])

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer>
                {toasts.map((toast: ToastInterface) => (
                    <Toast
                        key={`toast-${toast.id}`}
                        variant={toast.variant}
                        title={toast.title}
                        message={toast.message}
                        onClose={() => close(toast.id)}
                    />
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    )
}
