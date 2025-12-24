export async function GET() {
  const res = await fetch(
    "http://47.84.39.128/public/status.json",
    { cache: "no-store" }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
