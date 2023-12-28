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
  let state: ReviewKeyboardKey = ReviewKeyboardKey.Review

  while (state !== ReviewKeyboardKey.Save) {
    switch (state) {
      case ReviewKeyboardKey.Title:
        place.title = await nameField(con, ctx, place.title)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Address:
        place.address = await addressField(con, ctx, place.address)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Photo:
        place.photo = await photoField(con, ctx, place.photo)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Inst:
        place.inst = await instField(con, ctx, place.inst)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.GoogleLink:
        place.google_uri = await googleLinkField(con, ctx, place.google_uri)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.MilkPrice:
        place.milk_price = await milkPriceField(con, ctx, place.milk_price)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.BlackPrice:
        place.black_price = await blackPriceField(con, ctx, place.black_price)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Food:
        place.food = await foodField(con, ctx, place.food)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Wifi:
        place.wifi = await wifiField(con, ctx, place.wifi)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.WorkingHours:
        place.working_hours = await workingHoursField(
          con,
          ctx,
          place.working_hours,
        )
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Rating:
        place.rating = await ratingField(con, ctx, place.rating)
        state = ReviewKeyboardKey.Review
        break
      case ReviewKeyboardKey.Cancel:
        return null
      case ReviewKeyboardKey.Review: {
        const preview = await ctx.replyWithPhoto(place.photo, {
          caption: getPlaceCardText(place),
          reply_markup: reviewKeyboard,
        })
        const res = await con.waitForCallbackQuery(reviewKeyboardKeys)
        await ctx.api.deleteMessage(preview.chat.id, preview.message_id)
        state = res.match as ReviewKeyboardKey
        break
      }
      default:
        break
    }
  }

  return place
}
