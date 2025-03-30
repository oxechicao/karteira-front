export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  const body = await req.json();

  return new Response(JSON.stringify(body), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET = async () => {
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
