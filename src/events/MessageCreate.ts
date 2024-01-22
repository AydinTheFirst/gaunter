import { Events, Message } from "discord.js";
import Event from "@/classes/Event";

export default class MessageCreate extends Event {
  public constructor() {
    super(Events.MessageCreate);
  }

  public async run(message: Message): Promise<void> {
    const client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix!)) return;

    const args = message.content
      .slice(client.prefix!.length)
      .trim()
      .split(/ +/g);
    const command = args.shift()!.toLowerCase();

    if (!client.commands) return console.log("No commands collection");

    const cmd =
      client.commands.get(command) ||
      client.commands.find((c) => c.aliases!.includes(command));

    if (!cmd) return;
  }
}
