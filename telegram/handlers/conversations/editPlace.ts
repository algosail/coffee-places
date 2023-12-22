import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { ADMINS } from '$utils/constants.ts'
import { getPlace, savePlace } from '$utils/locations.ts'
import { editPlaceForm } from '$grammy/handlers/parts/mod.ts'

export const editPlace = async (
  con: GrammyConversation,
  ctx: GrammyContext,
) => {
  const { placeId } = ctx.session
  if (!placeId || !ctx.from?.username || !ADMINS.includes(ctx.from.username)) {
    ctx.reply(`Access deny`)
    return
  }

  const place = await con.external(() => getPlace(placeId))
  if (!place) {
    ctx.reply(`Place not founded`)
    return
  }

  const nextPlace = await editPlaceForm(con, ctx, place)

  if (nextPlace === null) return
  const ok = await con.external(() => savePlace(nextPlace))
  await ctx.reply(ok ? 'Done!' : 'Database error!')
  return
}
