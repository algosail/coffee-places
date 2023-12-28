import { Composer } from 'grammy'

import type { GrammyContext } from '$grammy/context.ts'
import { setUser } from '$utils/users.ts'
import { getFullName } from '$utils/grammy.ts'

const composer = new Composer<GrammyContext>()

composer.command('start', async (ctx) => {
  await ctx.conversation.exit()
  if (!ctx.from) return

  await setUser({
    chatId: ctx.chat.id,
    userId: ctx.from.id,
    name: getFullName(ctx.from),
  })

  await ctx.reply(
    `
		Hi ${
      getFullName(ctx.from).replaceAll('.', '')
    }, welcome to the <b>${ctx.me.username}</b>.
    \nI am here to help you find good coffee places ☕️🎉
		\nSend me your location
    `,
  )
})

export default composer
