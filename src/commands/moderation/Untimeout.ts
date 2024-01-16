import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";

export default class Cmd extends Command {
  public constructor() {
    super("untimeout", {
      category: "Moderation",
      description: "Removes timeout from a member",
      options: [
        {
          name: "member",
          description: "Member to untimeout",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for untimeout",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");

    await member.timeout(0, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Member Timed Out");
    embed.setDescription(`Successfully timed out ${member.user.username}`);

    cmd.reply({ embeds: [embed] });
  }
}
