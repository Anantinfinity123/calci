import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const input = url.searchParams.get("input");

  if (!input) {
    return json({ error: "Empty Input" }, { status: 400 });
  }

  try {
    const result = eval(input);
    return json({ result }, { status: 200 });
  } catch (error) {
    return json({ error: "Invalid expression" }, { status: 400 });
  }
};
