import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("lock", {
      category: "Moderation",
      description: "Disables @everyone from sending messages in channel.",
      botPermissions: ["ManageChannels"],
      userPermissions: ["ManageChannels"],
      options: [
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
    const channel = cmd.channel as TextChannel;

    channel.permissionOverwrites.create(
      cmd.guild!.roles.everyone,
      {
        SendMessages: false,
      },
      {
        reason: this.reason(cmd),
      }
    );

    const embed = new EmbedBuilder();
    embed.setTitle("Channel Locked");
    embed.setDescription(`Successfully locked ${channel}`);

    cmd.reply({ embeds: [embed] });
  }
}
