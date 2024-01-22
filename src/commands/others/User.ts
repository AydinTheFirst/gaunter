import { EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("user", {
      category: "Misc",
      description:
        "Shows information, such as ID and join date, about yourself or a user.",
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

    embed.setTitle(`${user.username}'s Profile`);
    embed.addFields([
      {
        name: "ID",
        value: user.id,
      },
      {
        name: "Joined Discord",
        value: user.createdAt.toDateString(),
      },
      {
        name: "Joined Server",
        value:
          cmd.guild!.members.cache.get(user.id)?.joinedAt?.toDateString() ||
          "N/A",
      },
    ]);
    embed.setColor("Random");
    embed.setThumbnail(user.displayAvatarURL({ size: 4096 }));

    cmd.reply({ embeds: [embed] });
  }
}
