import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: 'Location Picker',
        short_name: 'Location Picker',
        description: 'Location Picker – a tool for storing and sharing locations easily.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'fullscreen'],
        orientation: 'portrait',
        background_color: '#fff',
        theme_color: '#fff',
        categories: ['utilities', 'productivity'],
        icons: [
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        screenshots: [
            {
                src: '/images/about/full-screen.jpg',
                sizes: '800x1334',
                type: 'image/jpg',
                form_factor: 'wide',
            },
            {
                src: '/images/about/full-screen.jpg',
                sizes: '800x1334',
                type: 'image/jpg',
                form_factor: 'narrow',
            },
        ],
        protocol_handlers: [
            {
                protocol: 'web+comedyportal',
                url: '/?link=%s',
            },
        ],
    }
}
