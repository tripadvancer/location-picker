'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MapRef, Map as ReactMapGl, ViewState } from 'react-map-gl/maplibre'

import { MinusIcon, PlusIcon } from 'lucide-react'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { LocationPickerMapControl } from './location-picker-map-control'
import { LocationPickerSearch } from './location-picker-search'

export const LocationPickerMap = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mapRef = useRef<MapRef>(null)

    const [isMapMoving, setIsMapMoving] = useState(false)
    const [initialViewState, setInitialViewState] = useState<ViewState | null>(null)

    useEffect(() => {
        const lat = parseFloat(searchParams.get('lat') || '')
        const lng = parseFloat(searchParams.get('lng') || '')
        const zoom = parseFloat(searchParams.get('zoom') || '')

        if (!isNaN(lat) && !isNaN(lng) && !isNaN(zoom)) {
            setInitialViewState({
                latitude: lat,
                longitude: lng,
                zoom,
                bearing: 0,
                pitch: 0,
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
            })

            mapRef.current?.flyTo({
                center: [lng, lat],
                zoom: zoom,
                duration: 500,
            })
        }
    }, [searchParams])

    const handleZoom = useCallback((direction: 'in' | 'out') => {
        const method = direction === 'in' ? 'zoomIn' : 'zoomOut'
        mapRef.current?.[method]?.({ duration: 500 })
    }, [])

    const handleMoveStart = useCallback(() => {
        setIsMapMoving(true)
    }, [])

    const handleMoveEnd = useCallback(() => {
        setIsMapMoving(false)

        const map = mapRef.current
        if (!map) return

        const center = map.getCenter()
        const zoom = map.getZoom()

        if (isNaN(center.lat) || isNaN(center.lng) || isNaN(zoom)) return

        const roundedZoom = Math.round(zoom * 10) / 10

        const params = new URLSearchParams(searchParams.toString())
        params.set('lat', center.lat.toFixed(6))
        params.set('lng', center.lng.toFixed(6))
        params.set('zoom', roundedZoom.toFixed(1))

        router.replace(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    if (!initialViewState) return null

    return (
        <div className="aspect-square sm:aspect-video">
            <ReactMapGl
                ref={mapRef}
                id="locations-map"
                mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
                attributionControl={false}
                initialViewState={initialViewState}
                onMoveStart={handleMoveStart}
                onMoveEnd={handleMoveEnd}
            >
                <div className="absolute top-2 right-2 left-2 z-10">
                    <LocationPickerSearch />
                </div>

                <div className="absolute right-2 bottom-2 z-10 flex flex-col gap-y-1">
                    <LocationPickerMapControl onClick={() => handleZoom('in')}>
                        <PlusIcon size={16} />
                    </LocationPickerMapControl>
                    <LocationPickerMapControl onClick={() => handleZoom('out')}>
                        <MinusIcon size={16} />
                    </LocationPickerMapControl>
                </div>

                <Image
                    src="/images/pin-shadow.svg"
                    width={27}
                    height={41}
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                />
                <Image
                    src="/images/pin.svg"
                    width={27}
                    height={41}
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[13.5px] -translate-y-[36px]"
                    style={{ marginTop: isMapMoving ? -8 : 0 }}
                />
            </ReactMapGl>
        </div>
    )
}
