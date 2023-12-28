import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { skipKeyboard } from '$grammy/keyboards/mod.ts'

export const milkPriceField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string | undefined> => {
  if (prev) {
    await ctx.reply(`Edit milk based price (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Milk based price:`, { reply_markup: skipKeyboard })
  }

  const price = await con.wait()
  return price.message?.text
}
