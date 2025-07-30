'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GeolocateControl, MapRef, NavigationControl, Map as ReactMapGl, ViewState } from 'react-map-gl/maplibre'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export const LocationPickerMap = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mapRef = useRef<MapRef>(null)

    const [isMapMoving, setIsMapMoving] = useState(false)
    const [initialViewState, setInitialViewState] = useState<ViewState | null>(null)

    // Храним последние координаты карты, установленные через onMoveEnd
    const lastMovedByMapRef = useRef<{ lat: number; lng: number } | null>(null)

    // 1. Первоначальный initialViewState
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
        }
    }, [searchParams])

    // 2. Отслеживаем внешние изменения URL и делаем flyTo
    useEffect(() => {
        const map = mapRef.current
        if (!map) return

        const lat = parseFloat(searchParams.get('lat') || '')
        const lng = parseFloat(searchParams.get('lng') || '')
        const zoom = parseFloat(searchParams.get('zoom') || '')

        if (isNaN(lat) || isNaN(lng) || isNaN(zoom)) return

        const center = map.getCenter()
        const roundedLat = parseFloat(center.lat.toFixed(6))
        const roundedLng = parseFloat(center.lng.toFixed(6))

        const latChanged = Math.abs(roundedLat - lat) > 1e-6
        const lngChanged = Math.abs(roundedLng - lng) > 1e-6

        // Проверяем, не мы ли только что изменили эти координаты
        const lastMoved = lastMovedByMapRef.current
        const sameAsLastMoved =
            lastMoved && Math.abs(lastMoved.lat - lat) < 1e-6 && Math.abs(lastMoved.lng - lng) < 1e-6

        if ((latChanged || lngChanged) && !sameAsLastMoved) {
            map.flyTo({
                center: [lng, lat],
                zoom,
                duration: 800,
            })
        }
    }, [searchParams])

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
        const roundedLat = parseFloat(center.lat.toFixed(6))
        const roundedLng = parseFloat(center.lng.toFixed(6))

        lastMovedByMapRef.current = { lat: roundedLat, lng: roundedLng }

        const params = new URLSearchParams(searchParams.toString())
        params.set('lat', roundedLat.toString())
        params.set('lng', roundedLng.toString())
        params.set('zoom', roundedZoom.toFixed(1))

        router.replace(`?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    if (!initialViewState) return null

    return (
        <div className="over aspect-square overflow-hidden rounded-lg sm:aspect-video">
            <ReactMapGl
                ref={mapRef}
                id="locations-map"
                mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
                attributionControl={false}
                initialViewState={initialViewState}
                onMoveStart={handleMoveStart}
                onMoveEnd={handleMoveEnd}
            >
                <GeolocateControl />
                <NavigationControl />

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
