import type { Place } from '$utils/locations.ts'
import type { GrammyContext } from '$grammy/context.ts'

import { getPlaceLikes, hasBookmark } from '$utils/users.ts'
import { createPlaceKeyboard } from '$grammy/keyboards/mod.ts'
import { getPlaceCardText } from '$grammy/components/mod.ts'

export const sendPlaceCard = async (
  ctx: GrammyContext,
  place: Place,
  more = false,
) => {
  const likes = await getPlaceLikes(place.id)
  const isBookmark = ctx.from?.id
    ? await hasBookmark(ctx.from.id, place.id)
    : false
  const isLike = ctx.from?.id
    ? likes.findIndex(({ userId }) => userId === ctx.from!.id) >= 0
    : false

  return await ctx.replyWithPhoto(place.photo, {
    caption: getPlaceCardText(place, likes.length),
    reply_markup: createPlaceKeyboard(ctx, place.id, more, isBookmark, isLike),
  })
}
