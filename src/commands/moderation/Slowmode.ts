import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";
import ms from "ms";

export default class Cmd extends Command {
  public constructor() {
    super("slowmode", {
      category: "Moderation",
      description: "Enable or disable slowmode on a channel.",
      botPermissions: ["ManageChannels"],
      userPermissions: ["ManageChannels"],
      options: [
        {
          name: "time",
          description: "Time to set slowmode to",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "reason",
          description: "Reason for action",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const time = ms(cmd.options.getString("time") || "0s");
    if (time > 21600)
      return cmd.reply("Slowmode cannot be longer than 6 hours.");

    const channel = cmd.channel as TextChannel;
    channel.setRateLimitPerUser(time, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Slowmode Changed");
    embed.setDescription(
      `Slowmode has been ${time === 0 ? `disabled` : "enabled"}`
    );

    cmd.reply({ embeds: [embed] });
  }
}
