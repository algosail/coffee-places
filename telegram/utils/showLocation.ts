import { getPlace } from '$utils/locations.ts'
import type { GrammyContext } from '$grammy/context.ts'

export const showLocation = async (ctx: GrammyContext, placeId: string) => {
  const searching = await ctx.reply('Searching...')
  const place = await getPlace(placeId)

  if (!place) {
    ctx.api.editMessageText(
      searching.chat.id,
      searching.message_id,
      'Not founded',
    )
    return
  }

  await ctx.api.deleteMessage(searching.chat.id, searching.message_id)
  await ctx.replyWithVenue(
    place.location.latitude,
    place.location.longitude,
    place.title,
    place.address,
  )
}
