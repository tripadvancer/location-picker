'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type LocationActionsOpenButtonProps = {
    link: string
}

export const LocationActionsOpenButton = ({ link }: LocationActionsOpenButtonProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(link)
    }

    return (
        <Button variant="major" onClick={handleClick}>
            Open
        </Button>
    )
}
