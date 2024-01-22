import { Client, Events, Guild } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildCreate);
  }

  public async run(client: Client, guild: Guild): Promise<void> {
    client.logger?.log(
      `Joined a new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
  }
}
