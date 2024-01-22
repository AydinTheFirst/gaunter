import { EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("avatar", {
      category: "Misc",
      description: "Returns a user's avatar",
      options: [
        {
          name: "user",
          description: "The user to get the avatar of",
          type: 6,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const embed = new EmbedBuilder();
    const user = cmd.options.getUser("user") || cmd.user;

    embed.setTitle(`${user.username}'s Avatar`);
    embed.setImage(user.displayAvatarURL({ size: 4096 }));

    cmd.reply({ embeds: [embed] });
  }
}
