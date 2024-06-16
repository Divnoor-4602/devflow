import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const response = await fetch("https://ipapi.co/json/");

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error: any) {
    throw error;
  }
};
