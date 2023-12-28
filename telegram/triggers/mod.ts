import { Composer } from 'grammy'

import type { GrammyContext } from '$grammy/context.ts'
import callbackQueryActions from './callbackQueryActions.ts'
import locationAction from './locationAction.ts'

const composer = new Composer<GrammyContext>()

composer
  .use(callbackQueryActions)
  .use(locationAction)

export default composer
