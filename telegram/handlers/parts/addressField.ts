import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const addressField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string> => {
  if (prev) {
    await ctx.reply(`Edit address (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Address:`)
  }

  const address = await con.form.text()
  return address
}
