import { EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";
import { inviteLink } from "../../config";

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
        value: "Roach Rover",
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
        value: "[GitHub](https://github.com/AydinTheFirst/roach-rover",
      },
      {
        name: "Bot Invite",
        value: `[Invite](${inviteLink})`,
      },
    ]);

    cmd.reply({ embeds: [embed] });
  }
}
