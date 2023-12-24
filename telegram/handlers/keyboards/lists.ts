import { InlineKeyboard } from 'grammy'

import type { PlaceListData } from '$utils/list.ts'
import { PlaceKeyboardKey } from './place.ts'

export enum ListKeyboardKey {
  Country = 'country',
  City = 'city',
  Locality = 'locality',
}

export const createCountryListKeyboard = (countries: string[]) => {
  const keyboard = new InlineKeyboard()

  for (const country of countries) {
    keyboard.text(country, `${ListKeyboardKey.Country}:${country}`)
  }

  return keyboard
}

export const createCityListKeyboard = (cities: string[]) => {
  const keyboard = new InlineKeyboard()

  for (const city of cities) {
    keyboard.text(city, `${ListKeyboardKey.City}:${city}`)
  }

  return keyboard
}

export const createLocalityListKeyboard = (localities: string[]) => {
  const keyboard = new InlineKeyboard()

  for (const locality of localities) {
    keyboard.text(locality, `${ListKeyboardKey.Locality}:${locality}`)
  }

  return keyboard
}

export const createPlacesListKeyboard = (places: PlaceListData[]) => {
  const keyboard = new InlineKeyboard()

  for (const place of places) {
    keyboard.text(place.title, `${PlaceKeyboardKey.Show}:${place.id}`)
  }

  return keyboard
}
