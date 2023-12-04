import type { Location } from "grammy_types";
import { kv } from "./db.ts";

export interface Place {
  id: string;
  location: Location;
  title: string;
  address: string;
  photo?: string;
  description?: string;
  inst?: string;
  google_place_id?: string;
}

interface PlaceValue extends Omit<Place, "id" | "location"> {
  latitude: number;
  longitude: number;
}

const PLACES_KEY = "places";

const getDistance = (me: Location, place: Location): number => {
  return Math.sqrt(
    Math.pow(me.latitude - place.latitude, 2) +
      Math.pow(me.longitude - place.longitude, 2)
  );
};

export const findPlaces = async (me: Location, count = 3): Promise<Place[]> => {
  const iter = kv.list<Place>({ prefix: [PLACES_KEY] });

  const places: [number, Place][] = [];
  for await (const res of iter) {
    places.push([getDistance(me, res.value.location), res.value]);
  }

  const sorted = places
    .sort(([a], [b]) => a - b)
    .slice(0, count)
    .map(([, place]) => place);

  return sorted;
};

export const listPlaces = async (): Promise<Place[]> => {
  const iter = kv.list<Place>({ prefix: [PLACES_KEY] });

  const places: Place[] = [];
  for await (const res of iter) {
    places.push(res.value);
  }

  return places;
};

export const getPlace = async (id: string): Promise<Place | null> => {
  const res = await kv.get<Place>([PLACES_KEY, id]);
  return res.value;
};

export const addPlace = async ({
  latitude,
  longitude,
  ...values
}: PlaceValue) => {
  const id = crypto.randomUUID();
  const place: Place = {
    id,
    location: { latitude, longitude },
    ...values,
  };

  const _res = await kv.set([PLACES_KEY, id], place);

  return id;
};

export const editPlace = async (
  id: string,
  { latitude, longitude, ...values }: PlaceValue
) => {
  const place: Place = {
    id,
    location: { latitude, longitude },
    ...values,
  };

  const _res = await kv.set([PLACES_KEY, id], place);

  return id;
};

export const deletePlace = async (id: string) => {
  await kv.delete([PLACES_KEY, id]);
};
