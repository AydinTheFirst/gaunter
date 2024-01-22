import { Client, Events, Guild } from "discord.js";
import Event from "@/classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildMemberAdd);
  }

  public async run(client: Client, guild: Guild): Promise<void> {
    console.log("guildMemberAdd");
  }
}
