import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import InitializeWebApp from '../islands/InitializeWebApp.tsx'
import { getPlace, type Place } from '$utils/locations.ts'

export const handler: Handlers = {
  async GET(req, ctx) {
    const place = await getPlace(ctx.params.placeId)
    if (!place) return await ctx.renderNotFound()
    return await ctx.render(place)
  },
}

export default function Greet({ data }: PageProps<Place>) {
  return (
    <>
      <Head>
        <script src='https://telegram.org/js/telegram-web-app.js'></script>
      </Head>
      <main>
        <h1>{data.title}</h1>
        <address>{data.address}</address>
        <p>
          {data.inst && (
            <a href={data.inst} target='_black'>
              Instagram
            </a>
          )}
        </p>
      </main>
      <InitializeWebApp />
    </>
  )
}
