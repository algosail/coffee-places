import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { ADMINS } from '$utils/constants.ts'
import { kv } from '$utils/db.ts'
import { type User, USER_KEY } from '$utils/users.ts'
import conversationLeave from '$grammy/middlewares/conversation.ts'
import { cancelKeyboard } from '$grammy/keyboards/mod.ts'

export const mailing = async (
  con: GrammyConversation,
  ctx: GrammyContext,
) => {
  if (
    !ctx.from?.username ||
    !ADMINS.includes(ctx.from.username)
  ) {
    await ctx.reply(`Access deny`)
    return
  }
  await ctx.reply(
    `<b>Enter the text to be sent to all users:</b>\n=====================`,
    {
      reply_markup: cancelKeyboard,
    },
  )

  try {
    await con.run(conversationLeave)

    const message = await con.form.text()
    const progress = await ctx.reply('Sending///')

    const usersList = await kv.list<User>({ prefix: [USER_KEY] })
    let count = 0

    for await (const user of usersList) {
      await ctx.api.sendMessage(user.value.chatId, message)
      count++
      await ctx.api.editMessageText(
        progress.chat.id,
        progress.message_id,
        `Sending/// ${count}`,
      )
    }
    await ctx.reply(`Done!`)
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  } catch (_error) {
    await ctx.reply(`<b>Mass mailing canceled!</b>`)
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  }
}
