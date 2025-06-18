import { CoordinateFormat } from './common.enums'

/**
 * Detects whether a coordinate string is in DD or DMS format.
 * @param value - The coordinate string to check.
 * @returns CoordinateFormat (DD, DMS, or Unknown).
 */
export const detectCoordinateFormat = (value: string): CoordinateFormat => {
    if (isValidDDCoordinates(value)) return CoordinateFormat.DD
    if (isValidDMSCoordinates(value)) return CoordinateFormat.DMS
    return CoordinateFormat.Unknown
}

/**
 * Validates if the given string is in valid Decimal Degrees (DD) format.
 * Example: "55.7558, 37.6173"
 */
export const isValidDDCoordinates = (value: string): boolean => {
    const reg = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s*,\s*|\s+)([-+]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?)$/
    return reg.test(value.trim())
}

/**
 * Validates if the given string is in valid Degrees-Minutes-Seconds (DMS) format.
 * Example: "55°45'20.88\"N 37°37'2.28\"E"
 */
export const isValidDMSCoordinates = (value: string): boolean => {
    const reg =
        /^(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[NS]\s*[,\s]\s*(\d{1,3})°\s*(\d{1,2})['′]\s*(\d{1,2}(\.\d+)?)["″]?\s*[EW]$/i
    return reg.test(value.trim())
}

/**
 * Converts a DMS string to decimal degrees.
 * @param dms - The DMS coordinate string.
 * @returns Object with `lat` and `lng` in DD format, or null if invalid.
 */
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

/**
 * Parses a valid DD coordinate string and returns { lat, lng }.
 * @param value - A valid DD coordinate string (e.g. "55.7558, 37.6173")
 * @returns Object with lat/lng or null if invalid.
 */
export const parseDDCoordinates = (value: string): { lat: number; lng: number } | null => {
    if (!isValidDDCoordinates(value)) return null

    const [latRaw, lngRaw] = value.trim().split(/[\s,]+/)
    const lat = parseFloat(latRaw)
    const lng = parseFloat(lngRaw)

    return { lat, lng }
}
