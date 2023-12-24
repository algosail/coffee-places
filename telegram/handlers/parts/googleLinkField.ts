import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { skipKeyboard } from '$grammy/handlers/keyboards/mod.ts'

export const googleLinkField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: string,
): Promise<string | undefined> => {
  if (prev) {
    await ctx.reply(`Change google maps link:`)
  } else {
    await ctx.reply(`Google maps link:`, { reply_markup: skipKeyboard })
  }

  const link = await con.wait()
  return link.message?.text
}
