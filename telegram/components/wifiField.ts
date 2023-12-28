import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { booleanKeyboard, BooleanKeyboardKey } from '$grammy/keyboards/mod.ts'

export const wifiField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
  prev?: boolean,
): Promise<boolean> => {
  if (prev !== undefined) {
    await ctx.reply(
      `Edit wifi (prev <i>${
        prev ? BooleanKeyboardKey.Yes : BooleanKeyboardKey.No
      }</i>):`,
    )
  } else {
    await ctx.reply(`Is there wifi?:`, { reply_markup: booleanKeyboard })
  }

  const wifiRes = await con.waitForCallbackQuery([
    BooleanKeyboardKey.Yes,
    BooleanKeyboardKey.No,
  ], {
    otherwise: (ctx) =>
      ctx.reply('Use the buttons!', { reply_markup: booleanKeyboard }),
  })
  return wifiRes.match === BooleanKeyboardKey.Yes
}
