import { Message } from "discord.js";
import Event from "../classes/Event";
import { CustomClient } from "../types/types";

export default class MessageCreate extends Event {
  public constructor() {
    super("messageCreate");
  }

  public async run(message: Message): Promise<void> {
    const client = message.client as CustomClient;
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
