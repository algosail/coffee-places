import { findPlaces } from '$utils/locations.ts'
import { GrammyContext } from '$grammy/context.ts'
import { sendPlaceCard } from './sendPlaceCard.ts'

export const showAnotherOne = async (ctx: GrammyContext) => {
  if (!ctx.session.location) return
  const searching = await ctx.reply('Searching...')
  const [places, more] = await findPlaces(
    ctx.session.location,
    1,
    ctx.session.cursor,
  )

  if (places.length === 0) {
    ctx.api.editMessageText(
      searching.chat.id,
      searching.message_id,
      'Not founded',
    )
    return
  }

  ctx.session.cursor++
  await ctx.api.deleteMessage(searching.chat.id, searching.message_id)
  await sendPlaceCard(ctx, places[0], more)
}
