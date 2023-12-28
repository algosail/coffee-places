import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const photoField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string> => {
  if (prev) {
    await ctx.reply(`Change photo:`)
  } else {
    await ctx.reply(`Photo:`)
  }

  const photoCtx = await con.waitFor(':photo', {
    otherwise: (ctx) => ctx.reply('Send photo!'),
  })

  const photo = photoCtx.msg.photo?.[0]!
  return photo.file_id
}
