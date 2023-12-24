import { InlineKeyboard } from 'grammy'

import type { Place } from '$utils/locations.ts'

export enum PlaceKeyboardKey {
  Show = 'show',
  Location = 'location',
  AnotherOne = 'nextPlace',
  Edit = 'edit',
  Delete = 'delete',
}

export const createPlaceResultKeyboard = (places: Place[], more = false) => {
  const keyboard = new InlineKeyboard()
  for (const place of places) {
    keyboard.text(`Show ${place.title}`, `${PlaceKeyboardKey.Show}:${place.id}`)
      .row()
  }
  if (more) {
    keyboard.text('Show another one', PlaceKeyboardKey.AnotherOne).row()
  }
  return keyboard
}

export const createPlaceKeyboard = (
  placeId: string,
  more = false,
  isAdmin = false,
) => {
  const keyboard = new InlineKeyboard()
  keyboard.text('Get location', `${PlaceKeyboardKey.Location}:${placeId}`).row()

  if (more) {
    keyboard.text('Show another one', PlaceKeyboardKey.AnotherOne).row()
  }

  if (isAdmin) {
    keyboard.text('Edit', `${PlaceKeyboardKey.Edit}:${placeId}`)
    keyboard.text('Delete', `${PlaceKeyboardKey.Delete}:${placeId}`)
  }

  return keyboard
}
