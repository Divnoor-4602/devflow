import mongoose from "mongoose";

let isConnected: boolean = false;

export const databaseConnect = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("No Mongo uri found");

  if (isConnected) return console.log("MongoDB is already connected!");

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "devflow" });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
