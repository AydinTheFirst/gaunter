import { EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";
import config from "../../config";

// Returns bot information
export default class Cmd extends Command {
  public constructor() {
    super("bot", {
      category: "Misc",
      description: "Returns bot information",
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const embed = new EmbedBuilder();
    embed.setTitle("Bot Information");
    embed.setThumbnail(cmd.client.user!.displayAvatarURL());
    embed.addFields([
      {
        name: "Bot Name",
        value: config.botFullName,
      },
      {
        name: "Bot Version",
        value: "1.0.0",
      },
      {
        name: "Bot Author",
        value: "AydinTheFirst",
      },
      {
        name: "Bot Description",
        value: "A bot that does stuff.",
      },
      {
        name: "Bot Source Code",
        value: `[GitHub](${config.github})`,
        inline: true,
      },
      {
        name: "Bot Invite",
        value: `[Invite](${config.inviteLink})`,
        inline: true,
      },
    ]);

    cmd.reply({ embeds: [embed] });
  }
}
