import { IDBPDatabase, openDB } from 'idb'

import { Place } from './types'

let dbPromise: Promise<IDBPDatabase>

export async function initDB() {
    if (!dbPromise) {
        dbPromise = openDB('places-db', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('places')) {
                    db.createObjectStore('places', { keyPath: 'id', autoIncrement: true })
                }
            },
        })
    }
    return dbPromise
}

export async function getPlaces(): Promise<Place[]> {
    const db = await initDB()
    return await db.getAll('places')
}

export async function addPlace(place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>) {
    const db = await initDB()
    await db.add('places', {
        ...place,
        pinned: false,
        createdAt: Date.now(),
    })
}

export async function updatePlace(place: Place) {
    const db = await initDB()
    await db.put('places', place)
}

export async function deletePlace(id: number) {
    const db = await initDB()
    await db.delete('places', id)
}
