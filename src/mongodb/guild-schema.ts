import mongoose from "mongoose";

interface ISchema {
  id: number;
  ticket: {
    cache: {
      channel: string;
      user: string;
    }[];
    enabled: boolean;
    category: string;
    message: {
      title: string;
      description: string;
      color: string;
      label: string;
    };
  };
}

const schema = new mongoose.Schema<ISchema>({
  id: { type: Number, required: true },
  ticket: {
    cache: { type: Array },
    enabled: { type: Boolean },
    category: { type: String },
    message: {
      title: { type: String },
      description: { type: String },
      color: { type: String },
      label: { type: String },
    },
  },
});

export const guildModel = mongoose.model("guild", schema);
export { schema as IGuild };
