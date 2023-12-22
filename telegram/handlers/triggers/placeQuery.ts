import { Composer } from 'grammy'

import { deletePlace } from '$utils/locations.ts'
import { GrammyContext } from '$grammy/context.ts'
import { PlaceKeyboardKey } from '$grammy/handlers/keyboards/mod.ts'

const composer = new Composer<GrammyContext>()

composer.on('callback_query:data', async (ctx) => {
  const [key, id] = ctx.callbackQuery.data.split(':')
  console.log('callback_query', key, id)
  switch (key) {
    case PlaceKeyboardKey.Edit:
      console.log(key, id)
      ctx.session.placeId = id
      await ctx.conversation.enter('edit-place')
      break
    case PlaceKeyboardKey.Delete:
      {
        await ctx.deleteMessage()
        await ctx.reply(`Deleting...`)
        const res = await deletePlace(id)
        await ctx.reply(res ? 'Done!' : 'Error!')
      }
      break
    default:
      break
  }
})

export default composer
