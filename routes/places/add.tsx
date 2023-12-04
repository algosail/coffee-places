import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { addPlace } from "$utils/locations.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const title = form.get("title")?.toString();
    const latitude = form.get("latitude")?.toString();
    const longitude = form.get("longitude")?.toString();
    const address = form.get("address")?.toString();
    const description = form.get("description")?.toString();
    const inst = form.get("inst")?.toString();
    const google_place_id = form.get("google_place_id")?.toString();

    if (!title || !latitude || !longitude || !address) return ctx.render();

    // Add email to list.
    const id = await addPlace({
      title,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      address,
      description,
      inst,
      google_place_id,
    });

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", `/places/${id}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function AddPlace() {
  return (
    <>
      <Head>
        <title>New Places</title>
      </Head>
      <main>
        <h1>Add new place</h1>
        <form method="post">
          <label>
            Title
            <input name="title" required />
          </label>
          <label>
            Latitude
            <input name="latitude" type="number" required />
          </label>
          <label>
            Longitude
            <input name="longitude" type="number" required />
          </label>
          <label>
            Address
            <input name="address" required />
          </label>
          <label>
            Description
            <textarea name="description" />
          </label>
          <label>
            Instagram
            <input name="inst" />
          </label>
          <label>
            Google Place Id
            <input name="google_place_id" />
          </label>
          <button type="submit">Send</button>
        </form>
      </main>
    </>
  );
}
