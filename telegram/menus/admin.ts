import { Menu } from 'grammy_menu'
import { GrammyContext } from '$grammy/context.ts'

export const adminMenu = new Menu<GrammyContext>('admin')
  .text('Add place', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.conversation.enter('add-place')
  }).row()
  .text('Mass mailing', async (ctx) => {
    await ctx.deleteMessage()
    await ctx.conversation.enter('mailing')
  }).row()
  .back('Back')
