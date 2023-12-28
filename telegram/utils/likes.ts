import type { GrammyContext } from '$grammy/context.ts'
import { hasBookmark, likePlace, unlikePlace } from '$utils/users.ts'
import { createPlaceKeyboard } from '$grammy/keyboards/mod.ts'

export const addLike = async (
  ctx: GrammyContext,
  placeId: string,
) => {
  const userId = ctx.update.callback_query?.from.id
  if (!userId) return

  const res = await likePlace(placeId, userId)
  if (!res) return

  const bookmark = await hasBookmark(userId, placeId)

  await ctx.editMessageReplyMarkup({
    reply_markup: createPlaceKeyboard(ctx, placeId, false, bookmark, true),
  })
}

export const removeLike = async (
  ctx: GrammyContext,
  placeId: string,
) => {
  const userId = ctx.update.callback_query?.from.id
  if (!userId) return

  await unlikePlace(placeId, userId)

  const bookmark = await hasBookmark(userId, placeId)

  await ctx.editMessageReplyMarkup({
    reply_markup: createPlaceKeyboard(ctx, placeId, false, bookmark, false),
  })
}
