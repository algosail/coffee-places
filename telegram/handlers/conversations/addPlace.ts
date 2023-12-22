import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import { savePlace } from '$utils/locations.ts'
import {
  addressField,
  blackPriceField,
  editPlaceForm,
  foodField,
  googleLinkField,
  instField,
  locationField,
  milkPriceField,
  nameField,
  photoField,
  ratingField,
  wifiField,
  workingHoursField,
} from '$grammy/handlers/parts/mod.ts'

export const addPlace = async (con: GrammyConversation, ctx: GrammyContext) => {
  const title = await nameField(con, ctx)
  const location = await locationField(con, ctx)

  if (!location) {
    await ctx.reply(`Location error. Exit.`)
    return
  }

  const address = await addressField(con, ctx)
  const photo = await photoField(con, ctx)
  const inst = await instField(con, ctx)
  const google_uri = await googleLinkField(con, ctx)
  const milk_price = await milkPriceField(con, ctx)
  const black_price = await blackPriceField(con, ctx)
  const food = await foodField(con, ctx)
  const wifi = await wifiField(con, ctx)
  const working_hours = await workingHoursField(con, ctx)
  const rating = await ratingField(con, ctx)

  const place = await editPlaceForm(con, ctx, {
    id: crypto.randomUUID(),
    title,
    ...location,
    address,
    photo,
    inst,
    google_uri,
    milk_price,
    black_price,
    food,
    wifi,
    working_hours,
    rating,
  })

  if (place === null) return

  const ok = await con.external(() => savePlace(place))
  await ctx.reply(ok ? 'Done!' : 'Database error!')
  return
}
