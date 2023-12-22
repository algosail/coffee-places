import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { ADMINS } from '$utils/constants.ts'
import { getPlace, savePlace } from '$utils/locations.ts'
import { editPlaceForm } from '$grammy/handlers/parts/mod.ts'

export const editPlace = async (
  con: GrammyConversation,
  ctx: GrammyContext,
) => {
  if (
    !con.session.placeId || !ctx.from?.username ||
    !ADMINS.includes(ctx.from.username)
  ) {
    await ctx.reply(`Access deny`)
    return
  }
  con.log('editPlace', con.session.placeId)

  const place = await con.external(() => getPlace(con.session.placeId!))
  if (!place) {
    await ctx.reply(`Place not founded`)
    return
  }

  const nextPlace = await editPlaceForm(con, ctx, place)

  if (nextPlace === null) return
  const ok = await con.external(() => savePlace(nextPlace))
  await ctx.reply(ok ? 'Done!' : 'Database error!')
  return
}
