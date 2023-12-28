import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { skipKeyboard } from '$grammy/keyboards/mod.ts'

export const blackPriceField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string | undefined> => {
  if (prev) {
    await ctx.reply(`Edit black price (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Black price:`, { reply_markup: skipKeyboard })
  }

  const price = await con.wait()
  return price.message?.text
}
