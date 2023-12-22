import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const nameField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string> => {
  if (prev) {
    await ctx.reply(`Edit name (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Place name:`)
  }
  return await con.form.text((ctx) => ctx.reply('Send name!'))
}
