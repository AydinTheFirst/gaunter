import { Client } from "discord.js";
import Event from "../classes/Event";
import SlashCommandLoader from "../utils/loadSlashes";

export default class Ready extends Event {
  public constructor() {
    super("ready");
  }

  public async run(client: Client): Promise<void> {
    new SlashCommandLoader(client).load();
    console.log(`Logged in as ${client.user!.tag}`);
  }
}
