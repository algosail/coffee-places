import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { skipKeyboard } from '$grammy/handlers/keyboards/mod.ts'

export const foodField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string | undefined> => {
  if (prev) {
    await ctx.reply(`Edit food (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Food:`, { reply_markup: skipKeyboard })
  }

  const food = await con.wait()
  return food.message?.text
}
