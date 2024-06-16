import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/independent?status=true"
    );

    const countries = await response.json();

    return NextResponse.json({ countries });
  } catch (error: any) {
    console.log(error);
    NextResponse.json({ error: error.message });
  }
};
