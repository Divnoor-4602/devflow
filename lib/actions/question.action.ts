"use server";

import { databaseConnect } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    // connect to a database
    await databaseConnect();
  } catch (error) {}
}
