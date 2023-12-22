import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import {
  skipKeyboard,
  SkipKeyboardKey,
} from '$grammy/handlers/keyboards/mod.ts'

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

  const food = await con.form.text()
  if (food === SkipKeyboardKey.Skip) return undefined
  return food
}
