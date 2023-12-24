import { Composer } from 'grammy'

import { getCountryList } from '$utils/list.ts'
import { GrammyContext } from '$grammy/context.ts'
import { createCountryListKeyboard } from '$grammy/handlers/keyboards/mod.ts'

const composer = new Composer<GrammyContext>()

composer.command('list', async (ctx) => {
  await ctx.conversation.exit()
  const list = await getCountryList()

  if (list.length === 0) {
    await ctx.reply('Not founded')
    return
  }

  await ctx.reply(`Countries:`, {
    reply_markup: createCountryListKeyboard(list),
  })
})

export default composer
