import { PermissionsString } from "discord.js";
import mongoose from "mongoose";

interface LogConfig {
  enabled: boolean;
  channel: string;
  events: PermissionsString[];
}

interface TicketConfig {
  enabled: boolean;
  category: string;
  channel: string;
  count: number;
  cache: {
    channel: string;
    user: string;
  }[];
}

interface ISchema {
  id: number;
  log: LogConfig;
  ticket: TicketConfig;
}

const schema = new mongoose.Schema<ISchema>({
  id: { type: Number, required: true },
  log: {
    enabled: { type: Boolean },
    channel: { type: String },
    events: { type: [String] },
  },
  ticket: {
    enabled: { type: Boolean },
    category: { type: String },
    channel: { type: String },
    count: { type: Number, default: 0 },
    cache: {
      type: [
        {
          channel: { type: String },
          user: { type: String },
        },
      ],
    },
  },
});

export const guildModel = mongoose.model("guild", schema);
export { schema as IGuild };
