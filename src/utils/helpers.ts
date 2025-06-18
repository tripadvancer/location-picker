import { SearchType } from './enums'

export const detectSearchType = (value: string): SearchType => {
    if (isValidDDCoordinates(value)) return SearchType.DD
    if (isValidDMSCoordinates(value)) return SearchType.DMS
    return SearchType.TEXT
}

export const isValidDDCoordinates = (value: string): boolean => {
    const reg = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s*,\s*|\s+)([-+]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?)$/
    return reg.test(value.trim())
}

export const isValidDMSCoordinates = (value: string): boolean => {
    const reg =
        /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[NS]\s*[,\s]\s*(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[EW]$/i
    return reg.test(value.trim())
}

export const convertDMStoDD = (dms: string): { lat: number; lng: number } | null => {
    const reg =
        /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*([NS])[\s,]+(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*([EW])$/i
    const match = dms.trim().match(reg)

    if (!match) return null

    const [, dLat, mLat, sLat, , dirLat, dLng, mLng, sLng, , dirLng] = match

    const convert = (deg: string, min: string, sec: string, dir: string): number => {
        let val = parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600
        if (dir === 'S' || dir === 'W') val *= -1
        return val
    }

    return {
        lat: convert(dLat, mLat, sLat, dirLat.toUpperCase()),
        lng: convert(dLng, mLng, sLng, dirLng.toUpperCase()),
    }
}

export const parseDDCoordinates = (value: string): { lat: number; lng: number } | null => {
    if (!isValidDDCoordinates(value)) return null

    const [latRaw, lngRaw] = value.trim().split(/[\s,]+/)
    const lat = parseFloat(latRaw)
    const lng = parseFloat(lngRaw)

    return { lat, lng }
}
