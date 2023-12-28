import { Menu, MenuRange } from 'grammy_menu'
import type { GrammyContext } from '$grammy/context.ts'
import { showPlace } from '$grammy/utils/mod.ts'
import { getUserBookmarks } from '$utils/users.ts'

const renderPlace = async (ctx: GrammyContext) => {
  const id = ctx.match
  if (typeof id !== 'string') return
  await ctx.deleteMessage()
  await showPlace(ctx, id)
}

export const bookmarksMenu = new Menu<GrammyContext>('bookmarks')
  .addRange(async (ctx) => {
    const range = new MenuRange<GrammyContext>()
    if (!ctx.from?.id) return range
    const [bookmarks, cursor] = await getUserBookmarks(
      ctx.from.id,
      ctx.session.bookmarkCursor,
    )
    ctx.session.bookmarkCursor = cursor

    for (const { id, title, city } of bookmarks) {
      range.text({ text: `${title} / ${city}`, payload: id }, renderPlace).row()
    }

    if (cursor) {
      range.text({ text: 'Next' }, (ctx) => {
        ctx.menu.update()
      })
    }

    return range
  })
  .back('Back', (ctx) => {
    ctx.session.bookmarkCursor = undefined
  })
