import { load } from 'https://deno.land/std@0.222.1/dotenv/mod.ts'
const env = await load()
const kvToken = env['DENO_KV_ACCESS_TOKEN']
Deno.env.set('DENO_KV_ACCESS_TOKEN', kvToken)

const kv = await Deno.openKv(
  'https://api.deno.com/databases/8cafbbcb-1fb8-4cdf-b260-99c5672a8d13/connect',
)

const sessions = await kv.list({ prefix: ['sessions'] })

for await (const session of sessions) {
  await kv.delete(session.key)
}
