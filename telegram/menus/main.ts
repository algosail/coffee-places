import { Menu, MenuRange } from 'grammy_menu'

import { ADMINS } from '$utils/constants.ts'
import { GrammyContext } from '$grammy/context.ts'

import { adminMenu } from './admin.ts'
import { ListMenu, listMenu } from './list.ts'
import { bookmarksMenu } from './bookmarks.ts'

export const mainMenu = new Menu<GrammyContext>('main-menu')
  .submenu('Bookmarks', 'bookmarks')
  .url('About', 'https://coffee-places.deno.dev')
  .row()
  // .submenu('Places list', ListMenu.Country).row()
  .dynamic((ctx) => {
    const range = new MenuRange<GrammyContext>()

    if (ctx.from?.username && ADMINS.includes(ctx.from.username)) {
      range.submenu('Admin menu', 'admin').row()
    }

    return range
  })
  .text('Cancel', (ctx) => ctx.deleteMessage())

mainMenu.register([adminMenu, listMenu, bookmarksMenu])
