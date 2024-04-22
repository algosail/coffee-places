import type { Place } from '$utils/locations.ts'
import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import {
  reviewKeyboard,
  ReviewKeyboardKey,
  reviewKeyboardKeys,
} from '$grammy/keyboards/mod.ts'

import { nameField } from './nameField.ts'
import { addressField } from './addressField.ts'
import { photoField } from './photoField.ts'
import { instField } from './instField.ts'
import { googleLinkField } from './googleLinkField.ts'
import { milkPriceField } from './milkPriceField.ts'
import { blackPriceField } from './blackPriceField.ts'
import { foodField } from './foodField.ts'
import { wifiField } from './wifiField.ts'
import { workingHoursField } from './workingHoursField.ts'
import { ratingField } from './ratingField.ts'
import { getPlaceCardText } from './placeCardText.ts'

export const editPlaceForm = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  place: Place,
): Promise<Place | null> => {
  const nextPlace = { ...place }

  const preview = await ctx.replyWithPhoto(place.photo, {
    caption: getPlaceCardText(place),
    reply_markup: reviewKeyboard,
  })
  const res = await con.waitForCallbackQuery(reviewKeyboardKeys)
  await ctx.api.deleteMessage(preview.chat.id, preview.message_id)

  switch (res.match) {
    case ReviewKeyboardKey.Title:
      nextPlace.title = await nameField(con, ctx, place.title)
      break
    case ReviewKeyboardKey.Address:
      nextPlace.address = await addressField(con, ctx, place.address)
      break
    case ReviewKeyboardKey.Photo:
      nextPlace.photo = await photoField(con, ctx, place.photo)
      break
    case ReviewKeyboardKey.Inst:
      nextPlace.inst = await instField(con, ctx, place.inst)
      break
    case ReviewKeyboardKey.GoogleLink:
      nextPlace.google_uri = await googleLinkField(con, ctx, place.google_uri)
      break
    case ReviewKeyboardKey.MilkPrice:
      nextPlace.milk_price = await milkPriceField(con, ctx, place.milk_price)
      break
    case ReviewKeyboardKey.BlackPrice:
      nextPlace.black_price = await blackPriceField(con, ctx, place.black_price)
      break
    case ReviewKeyboardKey.Food:
      nextPlace.food = await foodField(con, ctx, place.food)
      break
    case ReviewKeyboardKey.Wifi:
      nextPlace.wifi = await wifiField(con, ctx, place.wifi)
      break
    case ReviewKeyboardKey.WorkingHours:
      nextPlace.working_hours = await workingHoursField(
        con,
        ctx,
        place.working_hours,
      )
      break
    case ReviewKeyboardKey.Rating:
      nextPlace.rating = await ratingField(con, ctx, place.rating)
      break
    default:
      break
  }

  return nextPlace
}
