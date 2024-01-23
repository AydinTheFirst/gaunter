import { findOrCreateGuild } from "@/mongodb";
import { Guild, TextChannel } from "discord.js";

export default class Event {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }

  public async run(..._args: any[]): Promise<void> {
    throw new Error(
      `The run method has not been implemented by ${this.name} | ${_args}`
    );
  }

  async getLogChannel(guild: Guild) {
    const db = await findOrCreateGuild(guild.id);
    if (!db.log.enabled) return;

    const channel = guild.channels.cache.get(db.log.channel) as TextChannel;

    return channel;
  }
}
