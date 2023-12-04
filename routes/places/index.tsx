import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { listPlaces } from "$utils/locations.ts";

export default defineRoute(async () => {
  const places = await listPlaces();

  return (
    <>
      <Head>
        <title>Places</title>
      </Head>
      <main>
        <h1>Places</h1>
        <a href="/places/add">Add place</a>
        <ul>
          {places.map((it) => (
            <li key={it.id}>
              <a href={`/places/${it.id}`}>{it.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
});
