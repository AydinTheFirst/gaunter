import { EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("help", {
      category: "Misc",
      description: "Displays a list of commands",
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const client = cmd.client;
    const embed = new EmbedBuilder();
    embed.setTitle("Help");

    for (const [name, command] of client.commands!) {
      embed.addFields([
        {
          name,
          value: command.description,
        },
      ]);
    }

    cmd.reply({ embeds: [embed] });
  }
}
