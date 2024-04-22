import type { GrammyContext } from '$grammy/context.ts'
import { isAdmin } from './isAdmin.ts'

export const editPlace = async (ctx: GrammyContext, placeId: string) => {
  if (!isAdmin(ctx)) {
    await ctx.reply(`You can't do this`)
    return
  }

  ctx.session.placeId = placeId
  await ctx.conversation.exit()
  await ctx.conversation.enter('edit-place')
}
