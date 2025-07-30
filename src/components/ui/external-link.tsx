import { ReactNode } from 'react'

import classNames from 'classnames'
import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

type ExternalLinkProps = {
    children: ReactNode
    href: string
    className?: string
}

export const ExternalLink = ({ children, href, className }: ExternalLinkProps) => {
    return (
        <Link
            href={href}
            target="_blank"
            className={classNames(
                'inline-flex items-center justify-center gap-x-0.5 text-blue-500 hover:text-blue-600',
                className,
            )}
        >
            {children}

            <ExternalLinkIcon size={12} strokeWidth={2.75} />
        </Link>
    )
}
