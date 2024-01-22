import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";
import { shortenURL } from "../../utils/lynx";

export default class Cmd extends Command {
  public constructor() {
    super("short", {
      category: "Others",
      description: "Shortens a URL",
      options: [
        {
          name: "url",
          description: "The URL to shorten",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    try {
      const dest = cmd.options.getString("url");
      const res = await shortenURL(dest!);
      const embed = new EmbedBuilder();
      embed.setTitle("URL Shortened");
      embed.setDescription(
        `Successfully shortened ${dest} to ${res.result.slug}\n\n[Click here](${res.url})`
      );
      cmd.reply({ embeds: [embed] });
    } catch (error: any) {
      const err = error.response.data.message;
      cmd.reply({
        content: `An error occured: ${err}`,
        ephemeral: true,
      });
    }
  }
}
