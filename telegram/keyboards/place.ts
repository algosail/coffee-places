import { InlineKeyboard } from 'grammy'

import type { Place } from '$utils/locations.ts'
import type { GrammyContext } from '$grammy/context.ts'
import { isAdmin } from '$grammy/utils/mod.ts'

export enum PlaceKeyboardKey {
  Show = 'show',
  Location = 'location',
  AnotherOne = 'nextPlace',
  AddBookmark = 'bookmark',
  RemoveBookmark = 'removeBookmark',
  Like = 'like',
  Unlike = 'unlike',
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
  ctx: GrammyContext,
  placeId: string,
  more = false,
  isBookmark = false,
  isLike = false,
) => {
  const keyboard = new InlineKeyboard()
    .text(
      isBookmark ? '📌' : 'Bookmark',
      `${
        isBookmark
          ? PlaceKeyboardKey.RemoveBookmark
          : PlaceKeyboardKey.AddBookmark
      }:${placeId}`,
    )
    .text(
      isLike ? '👍' : 'Like',
      `${isLike ? PlaceKeyboardKey.Unlike : PlaceKeyboardKey.Like}:${placeId}`,
    )
    .text('Location', `${PlaceKeyboardKey.Location}:${placeId}`).row()

  if (more) {
    keyboard.text('Show another one', PlaceKeyboardKey.AnotherOne).row()
  }

  if (isAdmin(ctx)) {
    keyboard.text('Edit', `${PlaceKeyboardKey.Edit}:${placeId}`)
    keyboard.text('Delete', `${PlaceKeyboardKey.Delete}:${placeId}`)
  }

  return keyboard
}
