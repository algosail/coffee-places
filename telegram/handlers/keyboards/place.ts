import { InlineKeyboard } from 'grammy'

export enum PlaceKeyboardKey {
  Edit = 'edit',
  Delete = 'delete',
}

export const adminPlaceKeyboard = new InlineKeyboard()
  .text('Edit', PlaceKeyboardKey.Edit)
  .text('Delete', PlaceKeyboardKey.Delete)

export const createAdminPlaceKeyboard = (placeId: string) => {
  return new InlineKeyboard()
    .text('Edit', `${PlaceKeyboardKey.Edit}:${placeId}`)
    .text('Delete', `${PlaceKeyboardKey.Delete}:${placeId}`)
}
