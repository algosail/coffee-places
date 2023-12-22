import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import type { Place } from '$utils/locations.ts'
import { getGeoData } from '$utils/geocoding.ts'

type Location = Pick<Place, 'location' | 'countryCode' | 'city' | 'locality'>

export const locationField = async (
  con: GrammyConversation,
  ctx: GrammyContext,
): Promise<Location | null> => {
  await ctx.reply(`Location:`)
  const locationCtx = await con.waitFor(':location', {
    otherwise: (ctx) => ctx.reply('Send location!'),
  })

  const location = locationCtx.message?.location
  if (!location) return null

  const geo = await con.external(() =>
    getGeoData(location.latitude, location.longitude)
  )
  if (!geo) return null

  return {
    location: { latitude: location.latitude, longitude: location.longitude },
    countryCode: geo.countryCode,
    city: geo.city,
    locality: geo.locality,
  }
}
