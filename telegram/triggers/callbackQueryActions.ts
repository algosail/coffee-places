import { Composer } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'
import { PlaceKeyboardKey } from '$grammy/keyboards/mod.ts'
import {
  addLike,
  addPlaceToBookmarks,
  editPlace,
  removeLike,
  removePlace,
  removePlaceFromBookmarks,
  showAnotherOne,
  showLocation,
  showPlace,
} from '$grammy/utils/mod.ts'

const composer = new Composer<GrammyContext>()

composer.on('callback_query:data', (ctx) => {
  if (ctx.callbackQuery.data === PlaceKeyboardKey.AnotherOne) {
    return showAnotherOne(ctx)
  }

  const [key, value] = ctx.callbackQuery.data.split(':')

  switch (key) {
    case PlaceKeyboardKey.Show:
      return showPlace(ctx, value)
    case PlaceKeyboardKey.AddBookmark:
      return addPlaceToBookmarks(ctx, value)
    case PlaceKeyboardKey.RemoveBookmark:
      return removePlaceFromBookmarks(ctx, value)
    case PlaceKeyboardKey.Like:
      return addLike(ctx, value)
    case PlaceKeyboardKey.Unlike:
      return removeLike(ctx, value)
    case PlaceKeyboardKey.Location:
      return showLocation(ctx, value)
    case PlaceKeyboardKey.Edit:
      return editPlace(ctx, value)
    case PlaceKeyboardKey.Delete:
      return removePlace(ctx, value)
    default:
      break
  }
})

export default composer
