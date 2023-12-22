import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import {
  skipKeyboard,
  SkipKeyboardKey,
} from '$grammy/handlers/keyboards/mod.ts'

export const workingHoursField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string | undefined> => {
  if (prev) {
    await ctx.reply(`Edit working hours (prev <i>${prev}</i>):`)
  } else {
    await ctx.reply(`Working hours:`, { reply_markup: skipKeyboard })
  }

  const hours = await con.form.text()
  if (hours === SkipKeyboardKey.Skip) return undefined
  return hours
}
