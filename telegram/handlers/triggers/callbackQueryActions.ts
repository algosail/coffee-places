import { Composer } from 'grammy'

import { ADMINS } from '$utils/constants.ts'
import { getCityList, getLocalityList, getPlaceList } from '$utils/list.ts'
import { deletePlace, findPlaces, getPlace } from '$utils/locations.ts'
import { GrammyContext } from '$grammy/context.ts'
import {
  createCityListKeyboard,
  createLocalityListKeyboard,
  createPlaceKeyboard,
  createPlacesListKeyboard,
  ListKeyboardKey,
  PlaceKeyboardKey,
} from '$grammy/handlers/keyboards/mod.ts'
import { sendPlaceCard } from '$grammy/handlers/parts/mod.ts'

const composer = new Composer<GrammyContext>()

const isAdmin = (ctx: GrammyContext): boolean => {
  return Boolean(ctx.from?.username && ADMINS.includes(ctx.from.username))
}

const showAnotherOne = async (ctx: GrammyContext) => {
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
  await sendPlaceCard(
    ctx,
    places[0],
    createPlaceKeyboard(places[0].id, more, isAdmin(ctx)),
  )
}

const showPlace = async (ctx: GrammyContext, placeId: string) => {
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
  await sendPlaceCard(
    ctx,
    place,
    createPlaceKeyboard(place.id, false, isAdmin(ctx)),
  )
}

const showLocation = async (ctx: GrammyContext, placeId: string) => {
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

const editPlace = async (ctx: GrammyContext, placeId: string) => {
  if (!isAdmin(ctx)) {
    await ctx.reply(`You can't do this`)
    return
  }

  ctx.session.placeId = placeId
  await ctx.conversation.enter('edit-place')
}

const removePlace = async (ctx: GrammyContext, placeId: string) => {
  if (!isAdmin(ctx)) {
    await ctx.reply(`You can't do this`)
    return
  }

  await ctx.deleteMessage()
  const deleting = await ctx.reply(`Deleting...`)
  const res = await deletePlace(placeId)
  await ctx.api.editMessageText(
    deleting.chat.id,
    deleting.message_id,
    res ? 'Done!' : 'Error!',
  )
}

const citiesList = async (ctx: GrammyContext, country: string) => {
  const list = await getCityList(country)

  if (list.length === 0) {
    await ctx.reply('Not founded')
    return
  }

  await ctx.reply(`Cities of ${country}:`, {
    reply_markup: createCityListKeyboard(list),
  })
}

const localitiesList = async (ctx: GrammyContext, city: string) => {
  const list = await getLocalityList(city)

  if (list.length === 0) {
    await ctx.reply('Not founded')
    return
  }

  await ctx.reply(`Localities of ${city}:`, {
    reply_markup: createLocalityListKeyboard(list),
  })
}

const placesList = async (ctx: GrammyContext, locality: string) => {
  const list = await getPlaceList(locality)

  if (list.length === 0) {
    await ctx.reply('Not founded')
    return
  }

  await ctx.reply(`Places of ${locality}:`, {
    reply_markup: createPlacesListKeyboard(list),
  })
}

composer.on('callback_query:data', (ctx) => {
  if (ctx.callbackQuery.data === PlaceKeyboardKey.AnotherOne) {
    return showAnotherOne(ctx)
  }

  const [key, value] = ctx.callbackQuery.data.split(':')

  switch (key) {
    case ListKeyboardKey.Country:
      return citiesList(ctx, value)
    case ListKeyboardKey.City:
      return localitiesList(ctx, value)
    case ListKeyboardKey.Locality:
      return placesList(ctx, value)
    case PlaceKeyboardKey.Show:
      return showPlace(ctx, value)
    case PlaceKeyboardKey.Location:
      return showLocation(ctx, value)
    case PlaceKeyboardKey.Edit:
      editPlace(ctx, value)
      break
    case PlaceKeyboardKey.Delete:
      return removePlace(ctx, value)
    default:
      break
  }
})

export default composer
