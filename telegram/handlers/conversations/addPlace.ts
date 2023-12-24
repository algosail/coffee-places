import { ADMINS } from '$utils/constants.ts'
import { savePlace } from '$utils/locations.ts'
import type { GrammyContext, GrammyConversation } from '$grammy/context.ts'
import conversationLeave from '$grammy/middlewares/conversation.ts'
import { cancelKeyboard } from '$grammy/handlers/keyboards/mod.ts'
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
  if (!ctx.from?.username || !ADMINS.includes(ctx.from.username)) {
    await ctx.reply(`Access deny`)
    return
  }

  await ctx.reply(`<b>Add place mode</b>\n=====================`, {
    reply_markup: cancelKeyboard,
  })

  try {
    await con.run(conversationLeave)

    const title = await nameField(con, ctx)
    const location = await locationField(con, ctx)

    if (!location) throw new Error('Edit')

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

    if (place === null) throw new Error('Edit')

    const creating = await ctx.reply('Creating...')

    const ok = await con.external(() => savePlace(place))
    await ctx.api.editMessageText(
      creating.chat.id,
      creating.message_id,
      ok ? 'Done!' : 'Database error!',
    )
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  } catch (_error) {
    await ctx.reply(`<b>Add place canceled!</b>`)
    await ctx.reply(`<b>Default mode</b>\n=====================`)
  }
}
