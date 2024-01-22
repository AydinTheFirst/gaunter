import { Client, Events, Guild } from "discord.js";
import Event from "@/classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildDelete);
  }

  public async run(client: Client, guild: Guild): Promise<void> {
    client.logger?.log(
      `I have been removed from: ${guild.name} (id: ${guild.id})`
    );
  }
}
