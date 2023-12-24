import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'
import { mainMenu } from '$grammy/handlers/menus/mod.ts'

const composer = new Composer<GrammyContext>()

composer.command('menu', async (ctx) => {
  await ctx.conversation.exit()
  await ctx.reply('Main menu:', { reply_markup: mainMenu })
})

export default composer
