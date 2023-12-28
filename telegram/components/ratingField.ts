import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'

export const ratingField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: number,
): Promise<number> => {
  if (prev !== undefined) {
    await ctx.reply(`Edit rating (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Rating:`)
  }

  const rating = await con.form.number((ctx) => ctx.reply('Send number!'))
  return rating
}
