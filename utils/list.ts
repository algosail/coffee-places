import { kv } from './db.ts'

interface Data {
  id: string
  title: string
  countryCode: string
  city: string
  locality: string
}

export type PlaceListData = Pick<Data, 'id' | 'title'>

const COUNTRY_KEY = 'countries'
const CITY_KEY = 'cities'
const LOCALITY_KEY = 'localities'

export const addPlaceToList = async (data: Data) => {
  const countryKey = [COUNTRY_KEY, data.countryCode]
  const cityKey = [CITY_KEY, data.city]
  const localityKey = [LOCALITY_KEY, data.locality]

  const countryRes = await kv.get<Set<string>>(countryKey)
  const cityRes = await kv.get<Set<string>>(cityKey)
  const localityRes = await kv.get<Map<string, PlaceListData>>(localityKey)

  const countryValue = new Set(countryRes.value)
  const cityValue = new Set(cityRes.value)
  const localityValue = new Map(localityRes.value)

  countryValue.add(data.city)
  cityValue.add(data.locality)
  localityValue.set(data.id, { id: data.id, title: data.title })

  const atomicOp = await kv
    .atomic()
    .set(countryKey, countryValue)
    .set(cityKey, cityValue)
    .set(localityKey, localityValue)
    .commit()

  return atomicOp.ok
}

export const deletePlaceFromList = async (data: Data) => {
  const countryKey = [COUNTRY_KEY, data.countryCode]
  const cityKey = [CITY_KEY, data.city]
  const localityKey = [LOCALITY_KEY, data.locality]

  let atomicOp = kv.atomic()

  const localityRes = await kv.get<Map<string, PlaceListData>>(localityKey)
  const localityValue = new Map(localityRes.value)
  localityValue.delete(data.id)

  if (localityValue.size !== 0) {
    const res = await atomicOp.set(localityKey, localityValue).commit()
    return res.ok
  }

  atomicOp = atomicOp.delete(localityKey)

  const cityRes = await kv.get<Set<string>>(cityKey)
  const cityValue = new Set(cityRes.value)
  cityValue.delete(data.locality)

  if (cityValue.size !== 0) {
    const res = await atomicOp.set(cityKey, cityValue).commit()
    return res.ok
  }

  atomicOp = atomicOp.delete(cityKey)

  const countryRes = await kv.get<Set<string>>(countryKey)
  const countryValue = new Set(countryRes.value)
  countryValue.delete(data.city)

  if (countryValue.size !== 0) {
    const res = await atomicOp.set(countryKey, countryValue).commit()
    return res.ok
  }

  const res = await atomicOp.delete(countryKey).commit()
  return res.ok
}

export const getCountryList = async (): Promise<string[]> => {
  const res = await kv.list<Set<string>>({ prefix: [COUNTRY_KEY] })

  const list: string[] = []

  for await (const it of res) {
    list.push(it.key[1] as string)
  }

  return list
}

export const getCityList = async (countryCode: string): Promise<string[]> => {
  const res = await kv.get<Set<string>>([COUNTRY_KEY, countryCode])
  if (!res.value) return []
  return [...res.value]
}

export const getAllCityList = async (): Promise<string[]> => {
  const res = await kv.list<Set<string>>({ prefix: [COUNTRY_KEY] })
  const cities: string[] = []

  for await (const country of res) {
    cities.push(...country.value)
  }

  return cities
}

export const getLocalityList = async (city: string): Promise<string[]> => {
  const res = await kv.get<Set<string>>([CITY_KEY, city])
  if (!res.value) return []
  return [...res.value]
}

export const getPlaceList = async (
  locality: string,
): Promise<PlaceListData[]> => {
  const res = await kv.get<Map<string, PlaceListData>>([LOCALITY_KEY, locality])
  if (!res.value) return []
  return [...res.value.values()]
}

export const getPlaceOfCityList = async (
  city: string,
): Promise<PlaceListData[]> => {
  const localities = await getLocalityList(city)
  const placeLocality = localities.map((locality) => getPlaceList(locality))

  const placesMap: Map<string, PlaceListData> = new Map()

  for await (const places of placeLocality) {
    for (const place of places) {
      placesMap.set(place.id, place)
    }
  }

  return Array.from(placesMap.values())
}
