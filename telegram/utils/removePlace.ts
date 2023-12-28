import { deletePlace } from '$utils/locations.ts'
import type { GrammyContext } from '$grammy/context.ts'
import { isAdmin } from './isAdmin.ts'

export const removePlace = async (ctx: GrammyContext, placeId: string) => {
  if (!isAdmin(ctx)) {
    await ctx.reply(`You can't do this`)
    return
  }

  await ctx.deleteMessage()
  const deleting = await ctx.reply(`Deleting...`)
  const res = await deletePlace(placeId)
  await ctx.api.editMessageText(
    deleting.chat.id,
    deleting.message_id,
    res ? 'Done!' : 'Error!',
  )
}
