import { InlineKeyboard } from 'grammy'

export enum CancelKeyboardKey {
  Cancel = 'cancel',
}

export const cancelKeyboard = new InlineKeyboard()
  .text('Cancel', CancelKeyboardKey.Cancel)

export const cancelKeyboardKeys = Object.values(CancelKeyboardKey)
