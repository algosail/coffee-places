import { Menu, MenuRange } from 'grammy_menu'

import {
  getCityList,
  getCountryList,
  getLocalityList,
  getPlaceList,
} from '$utils/list.ts'
import { GrammyContext } from '$grammy/context.ts'
import { showPlace } from '$grammy/utils/mod.ts'

export enum ListMenu {
  Country = 'country-list',
  City = 'city-list',
  Locality = 'locality-list',
  Place = 'place-list',
}

const renderPlace = async (ctx: GrammyContext) => {
  const id = ctx.match
  if (typeof id !== 'string') return
  await showPlace(ctx, id)
  await ctx.deleteMessage()
}

const placesMenu = new Menu<GrammyContext>(ListMenu.Place)
  .addRange(async (ctx) => {
    const range = new MenuRange<GrammyContext>()
    if (!ctx.session.placeListLocality) return range
    const places = await getPlaceList(ctx.session.placeListLocality)

    for (const { id, title } of places) {
      range.text({ text: title, payload: id }, renderPlace).row()
    }

    return range
  })
  .back('Back')

const localitiesMenu = new Menu<GrammyContext>(ListMenu.Locality)
  .addRange(async (ctx) => {
    const range = new MenuRange<GrammyContext>()
    if (!ctx.session.localityListCity) return range
    const localities = await getLocalityList(ctx.session.localityListCity)

    for (const locality of localities) {
      range.submenu(locality, ListMenu.Place, (ctx) => {
        ctx.session.placeListLocality = locality
      }).row()
    }

    return range
  })
  .back('Back')

localitiesMenu.register(placesMenu)

const cityMenu = new Menu<GrammyContext>(ListMenu.City)
  .addRange(async (ctx) => {
    const range = new MenuRange<GrammyContext>()
    if (!ctx.session.cityListCountry) return range
    const cities = await getCityList(ctx.session.cityListCountry)

    for (const city of cities) {
      range.submenu(city, ListMenu.Locality, (ctx) => {
        ctx.session.localityListCity = city
      }).row()
    }

    return range
  })
  .back('Back')

cityMenu.register(localitiesMenu)

export const listMenu = new Menu<GrammyContext>(ListMenu.Country)
  .addRange(async () => {
    const range = new MenuRange<GrammyContext>()
    const countries = await getCountryList()

    for (const country of countries) {
      range.submenu(country, ListMenu.City, (ctx) => {
        ctx.session.cityListCountry = country
      }).row()
    }

    return range
  })
  .back('Back')

listMenu.register(cityMenu)
