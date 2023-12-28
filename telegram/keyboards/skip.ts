import { InlineKeyboard } from 'grammy'

export enum SkipKeyboardKey {
  Skip = 'skip',
}

export const skipKeyboard = new InlineKeyboard()
  .text('Skip', SkipKeyboardKey.Skip)
