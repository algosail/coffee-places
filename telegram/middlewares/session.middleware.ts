import { kv } from '$utils/db.ts'
import { DenoKVAdapter } from 'https://deno.land/x/grammy_storages@v2.3.0/denokv/src/adapter.ts'
import { GrammyContext, GrammySession } from '$grammy/context.ts'
import { Composer, session as grammySession } from '$grammy/deps.ts'

const session = new Composer<GrammyContext>()

// deno-lint-ignore no-explicit-any
const storage = new DenoKVAdapter<any>(kv)

session.use(
  grammySession({
    initial: (): GrammySession => ({
      placeId: null,
      location: null,
      cursor: 0,
    }),
    getSessionKey: (ctx) =>
      `coffee_place_bot:${ctx.chat?.id.toString()}_${ctx.from?.id?.toString()}`,
    storage,
  }),
)
export default session
