import { InlineKeyboard } from 'grammy'

export enum BooleanKeyboardKey {
  Yes = 'yes',
  No = 'no',
}

export const booleanKeyboard = new InlineKeyboard()
  .text('Yes', BooleanKeyboardKey.Yes)
  .text('No', BooleanKeyboardKey.No)
