import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "Next JS";
  const page = searchParams.get("page") || 1;
  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const responseData = await response.json();
    return NextResponse.json(responseData.data);
  } catch (error) {
    throw error;
  }
};
