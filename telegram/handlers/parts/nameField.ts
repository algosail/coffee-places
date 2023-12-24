import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const nameField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string> => {
  const text = prev ? `Edit name:\n(prev <i>${prev}</i>)` : `Place name:`
  await ctx.reply(text)

  const name = await con.waitFor('message:text', {
    otherwise: (ctx) => ctx.reply('Send name!'),
  })

  return name.message.text
}
