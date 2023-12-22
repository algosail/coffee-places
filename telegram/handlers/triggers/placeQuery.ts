import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'
import { PlaceKeyboardKey } from '$grammy/handlers/keyboards/mod.ts'

const composer = new Composer<GrammyContext>()

composer.on('callback_query:data', async (ctx) => {
  const [key, id] = ctx.callbackQuery.data.split(':')
  switch (key) {
    case PlaceKeyboardKey.Edit:
      console.log(key, id)
      ctx.session = { ...ctx.session, placeId: id }
      await ctx.conversation.enter('edit-place')
      break
    case PlaceKeyboardKey.Delete:
      ctx.session.placeId = id
      break
    default:
      break
  }
})

export default composer
