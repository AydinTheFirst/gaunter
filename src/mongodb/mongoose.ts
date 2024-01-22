import mongoose from "mongoose";
import { guildModel } from "./guild-schema";

try {
  await mongoose.connect(process.env.mongodb!);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB: " + error);
}

export const findOrCreateGuild = async (id: string) => {
  const guild = await guildModel.findOne({ id });
  if (guild) return guild;

  const newGuild = guildModel.create({ id });
  return newGuild;
};
