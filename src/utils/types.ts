export type Coordinates = {
    lat: number
    lng: number
}

export type SearchItem = {
    title: string
    description: string
    coordinates: Coordinates
}

export interface Place {
    id: number
    coordinates: Coordinates
    name: string
}
