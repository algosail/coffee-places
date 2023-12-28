import type { Place } from '$utils/locations.ts'

export const getPlaceCardText = (
  place: Place,
  likes = 0,
) => (`<b>📍 <a href="${place.inst}">${place.title}</a></b>    📈 ${place.rating}/10${
  likes ? `    👍 ${likes}` : ''
}\n\n${place.milk_price ? `🧋 <b>Milk based:</b> ${place.milk_price}\n` : ''}${
  place.black_price ? `☕️ <b>Black:</b> ${place.black_price}\n` : ''
}${place.food ? `🍩 <b>Food:</b> ${place.food}\n` : ''}📡 <b>Wifi:</b> ${
  place.wifi ? 'Yes' : 'No'
}\n\n${place.working_hours ? `${place.working_hours}\n` : ''}${
  place.google_uri
    ? `<a href="${place.google_uri}">${place.address}</a>`
    : place.address
}`)
