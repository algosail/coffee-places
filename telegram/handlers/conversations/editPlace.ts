import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { ADMINS } from '$utils/constants.ts'
import { getPlace, savePlace } from '$utils/locations.ts'
import conversationLeave from '$grammy/middlewares/conversation.ts'
import { cancelKeyboard } from '$grammy/handlers/keyboards/mod.ts'
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
  await ctx.reply(`<b>Edit place mode</b>\n=====================`, {
    reply_markup: cancelKeyboard,
  })

  try {
    await con.run(conversationLeave)

    const place = await con.external(() => getPlace(con.session.placeId!))
    if (!place) throw new Error('Edit')

    const nextPlace = await editPlaceForm(con, ctx, place)
    if (nextPlace === null) throw new Error('Edit')

    const saving = await ctx.reply('Saving...')

    const ok = await con.external(() => savePlace(nextPlace))
    await ctx.api.editMessageText(
      saving.chat.id,
      saving.message_id,
      ok ? 'Done!' : 'Database error!',
    )
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  } catch (_error) {
    await ctx.reply(`<b>Edit place canceled!</b>`)
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  }
}
