import type { InlineKeyboard } from 'grammy'

import type { GrammyContext } from '$grammy/context.ts'
import type { Place } from '$utils/locations.ts'

export const sendPlaceCard = async (
  ctx: GrammyContext,
  place: Place,
  reply_markup?: InlineKeyboard,
) => {
  await ctx.replyWithPhoto(place.photo, {
    reply_markup,
    caption:
      `<b><a href="${place.inst}">${place.title}</a> | ${place.rating}/10</b>\n\n${
        place.milk_price ? `<b>Milk based:</b> ${place.milk_price}\n` : ''
      }${place.black_price ? `<b>Black:</b> ${place.black_price}\n` : ''}${
        place.food ? `<b>Food:</b> ${place.food}\n` : ''
      }<b>Wifi:</b> ${place.wifi ? 'Yes' : 'No'}\n\n${
        place.working_hours ? `${place.working_hours}\n` : ''
      }${
        place.google_uri
          ? `<a href="${place.google_uri}">${place.address}</a>`
          : place.address
      }`,
  })
}
