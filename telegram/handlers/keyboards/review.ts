import { InlineKeyboard } from 'grammy'

export enum ReviewKeyboardKey {
  Review = 'review',
  Save = 'save',
  Cancel = 'cancel',
  Title = 'title',
  Address = 'address',
  Photo = 'photo',
  Inst = 'inst',
  GoogleLink = 'google_link',
  MilkPrice = 'milk_price',
  BlackPrice = 'black_price',
  Food = 'food',
  Wifi = 'wifi',
  WorkingHours = 'working_hours',
  Rating = 'rating',
}

export const reviewKeyboard = new InlineKeyboard()
  .text('Save', ReviewKeyboardKey.Save).row()
  .text('Edit name', ReviewKeyboardKey.Title).row()
  .text('Edit address', ReviewKeyboardKey.Address).row()
  .text('Edit photo', ReviewKeyboardKey.Photo).row()
  .text('Edit instagram', ReviewKeyboardKey.Inst).row()
  .text('Edit google link', ReviewKeyboardKey.GoogleLink).row()
  .text('Edit milk based price', ReviewKeyboardKey.MilkPrice).row()
  .text('Edit black price', ReviewKeyboardKey.BlackPrice).row()
  .text('Edit food', ReviewKeyboardKey.Food).row()
  .text('Edit wifi', ReviewKeyboardKey.Wifi).row()
  .text('Edit working hours', ReviewKeyboardKey.WorkingHours).row()
  .text('Edit rating', ReviewKeyboardKey.Rating).row()
  .text('Cancel', ReviewKeyboardKey.Cancel)

export const reviewKeyboardKeys = Object.values(ReviewKeyboardKey)
