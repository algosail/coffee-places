import type { GrammyContext } from '$grammy/context.ts'
import { addBookmark, deleteBookmark, hasUserLike } from '$utils/users.ts'
import { createPlaceKeyboard } from '$grammy/keyboards/mod.ts'

export const addPlaceToBookmarks = async (
  ctx: GrammyContext,
  placeId: string,
) => {
  const userId = ctx.update.callback_query?.from.id
  if (!userId) return

  const res = await addBookmark({
    userId,
    placeId,
  })
  if (!res) return

  const hasLike = await hasUserLike(placeId, userId)

  await ctx.editMessageReplyMarkup({
    reply_markup: createPlaceKeyboard(ctx, placeId, false, true, hasLike),
  })
}

export const removePlaceFromBookmarks = async (
  ctx: GrammyContext,
  placeId: string,
) => {
  const userId = ctx.update.callback_query?.from.id
  if (!userId) return

  await deleteBookmark({
    userId,
    placeId,
  })
  const hasLike = await hasUserLike(placeId, userId)

  await ctx.editMessageReplyMarkup({
    reply_markup: createPlaceKeyboard(ctx, placeId, false, false, hasLike),
  })
}
