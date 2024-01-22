import { ActivityType, Client, Events } from "discord.js";
import Event from "@/classes/Event";
import SlashCommandLoader from "@/utils/loadSlashes";

export default class Ready extends Event {
  public constructor() {
    super(Events.ClientReady);
  }

  public async run(client: Client): Promise<void> {
    new SlashCommandLoader(client).load();
    console.log(`Logged in as ${client.user!.tag}`);
    client.user?.setActivity({
      name: "Fristroop Development",
      type: ActivityType.Playing,
    });
  }
}
