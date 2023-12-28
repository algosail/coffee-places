import { ADMINS } from '$utils/constants.ts'
import type { GrammyContext } from '$grammy/context.ts'

export const isAdmin = (ctx: GrammyContext): boolean => {
  return Boolean(ctx.from?.username && ADMINS.includes(ctx.from.username))
}
