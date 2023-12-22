import { Menu, MenuRange } from 'grammy_menu'

import { ADMINS } from '$utils/constants.ts'
import { GrammyContext } from '$grammy/context.ts'

import { adminMenu } from './admin.ts'

export const mainMenu = new Menu<GrammyContext>('mainMenu')
  .text('Favorites', async (ctx) => {
    await ctx.deleteMessage()
    ctx.reply('Coming soon')
  })
  .url('About', 'https://coffee-places.deno.dev/about')
  .row()
  .dynamic((ctx) => {
    const range = new MenuRange<GrammyContext>()

    if (ctx.from?.username && ADMINS.includes(ctx.from.username)) {
      range.submenu('Admin menu', 'admin').row()
    }

    return range
  })
  .text('Cancel', (ctx) => ctx.deleteMessage())

mainMenu.register(adminMenu)
