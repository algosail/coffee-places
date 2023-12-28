import { MiddlewareFn } from 'grammy'

import { GrammyContext } from '$grammy/context.ts'

import { listOfCommands } from '$grammy/commands/mod.ts'
import { CancelKeyboardKey } from '$grammy/keyboards/mod.ts'

const conversation: MiddlewareFn<GrammyContext> = async (
  ctx,
  next,
) => {
  const isLeave = ctx.callbackQuery?.data === CancelKeyboardKey.Cancel ||
    ctx.hasCommand(listOfCommands.map(({ command }) => command))

  if (isLeave) throw 'Exit'

  await next()
}

export default conversation
