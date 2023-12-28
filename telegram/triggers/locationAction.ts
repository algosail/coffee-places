import { Composer, InputMediaBuilder } from 'grammy'

import type { Place } from '$utils/locations.ts'
import { findPlaces } from '$utils/locations.ts'
import { GrammyContext } from '$grammy/context.ts'
import { createPlaceResultKeyboard } from '$grammy/keyboards/mod.ts'

const composer = new Composer<GrammyContext>()

const getPlaceCaption = (
  place: Place,
): string => (`📍 <a href="${place.inst}">${place.title}</a> 📈 ${place.rating}/10\n🗺 ${
  place.google_uri
    ? `<a href="${place.google_uri}">${place.address}</a>`
    : place.address
}\n`)

composer.on(':location', async (ctx) => {
  const location = ctx.message?.location
  if (!location) return

  ctx.session.location = location
  ctx.session.cursor = 0

  const search = await ctx.reply('Searching...')
  const [places, more] = await findPlaces(location)

  const mediaGroup = places.map((place, i) =>
    InputMediaBuilder.photo(place.photo, {
      caption: `${i + 1}. ${place.title}`,
    })
  )

  await ctx.api.deleteMessage(search.chat.id, search.message_id)
  await ctx.replyWithMediaGroup(mediaGroup)
  await ctx.reply(places.map(getPlaceCaption).join('\n'), {
    disable_web_page_preview: true,
    reply_markup: createPlaceResultKeyboard(places, more),
  })

  if (more) {
    ctx.session.cursor = places.length
  }
})

export default composer
