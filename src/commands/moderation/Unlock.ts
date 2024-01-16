import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";

export default class Cmd extends Command {
  public constructor() {
    super("unlock", {
      category: "Moderation",
      description: "Allows @everyone to send messages in channel.",
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
        SendMessages: true,
      },
      {
        reason: this.reason(cmd),
      }
    );

    const embed = new EmbedBuilder();
    embed.setTitle("Channel Unlocked");
    embed.setDescription(`Successfully unlocked ${channel}`);

    cmd.reply({ embeds: [embed] });
  }
}
