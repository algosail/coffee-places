import type { Location } from 'grammy_types'
import { kv } from './db.ts'
import { getGeoData } from './geocoding.ts'

export interface Place {
  id: string
  title: string
  location: Location
  countryCode: string
  locality: string
  city: string
  address: string
  photo: string
  inst?: string
  google_uri?: string
  milk_price?: string
  black_price?: string
  food?: string
  wifi?: boolean
  working_hours?: string
  rating?: number
}

const PLACES_KEY = 'places'
const PLACES_ID_KEY = 'places_id'

const getDistance = (me: Location, place: Location): number => {
  return Math.sqrt(
    Math.pow(me.latitude - place.latitude, 2) +
      Math.pow(me.longitude - place.longitude, 2),
  )
}

export const findPlaces = async (me: Location, count = 3): Promise<Place[]> => {
  const geo = await getGeoData(me.latitude, me.longitude)
  if (geo === null) return []

  const prefix = [PLACES_KEY, geo.countryCode, geo.city]
  const iter = kv.list<Place>({ prefix })

  const places: [number, Place][] = []
  for await (const res of iter) {
    places.push([getDistance(me, res.value.location), res.value])
  }

  const sorted = places
    .sort(([a], [b]) => a - b)
    .slice(0, count)
    .map(([, place]) => place)

  return sorted
}

export const listPlaces = async (): Promise<Place[]> => {
  const iter = kv.list<Place>({ prefix: [PLACES_ID_KEY] })

  const places: Place[] = []
  for await (const res of iter) {
    places.push(res.value)
  }

  return places
}

export const getPlace = async (id: string): Promise<Place | null> => {
  const res = await kv.get<Place>([PLACES_KEY, id])
  return res.value
}

export const savePlace = async (place: Place) => {
  const placeIdKey = [PLACES_ID_KEY, place.id]
  const placeKey = [
    PLACES_KEY,
    place.countryCode,
    place.city,
    place.locality,
    place.id,
  ]
  const atomicOp = kv.atomic()
    .set(placeIdKey, place)
    .set(placeKey, place)

  const res = await atomicOp.commit()
  return res.ok
}

export const deletePlace = async (id: string) => {
  const place = await getPlace(id)
  if (!place) return true

  const placeIdKey = [PLACES_ID_KEY, place.id]
  const placeKey = [
    PLACES_KEY,
    place.countryCode,
    place.city,
    place.locality,
    place.id,
  ]

  const atomicOp = kv.atomic()
    .delete(placeIdKey)
    .delete(placeKey)

  const res = await atomicOp.commit()
  return res.ok
}
