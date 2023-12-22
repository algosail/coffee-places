import { Composer } from 'grammy'

import { listPlaces } from '$utils/locations.ts'
import { ADMINS } from '$utils/constants.ts'
import { GrammyContext } from '$grammy/context.ts'
import { sendPlaceCard } from '$grammy/handlers/parts/mod.ts'
import { createAdminPlaceKeyboard } from '$grammy/handlers/keyboards/mod.ts'

const composer = new Composer<GrammyContext>()

composer.command('list', async (ctx) => {
  const list = await listPlaces()

  if (list.length === 0) {
    await ctx.reply('Empty')
    return
  }

  for (const it of list) {
    const keyboard = ctx.from?.username && ADMINS.includes(ctx.from.username)
      ? createAdminPlaceKeyboard(it.id)
      : undefined

    await sendPlaceCard(ctx, it, keyboard)
  }
})

export default composer
