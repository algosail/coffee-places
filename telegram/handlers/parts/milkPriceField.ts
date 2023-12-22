import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import {
  skipKeyboard,
  SkipKeyboardKey,
} from '$grammy/handlers/keyboards/mod.ts'

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

  const price = await con.form.text()
  if (price === SkipKeyboardKey.Skip) return undefined
  return price
}
