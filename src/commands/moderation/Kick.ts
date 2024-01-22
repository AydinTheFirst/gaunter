import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("kick", {
      category: "Moderation",
      description: "Kicks a member",
      botPermissions: ["KickMembers"],
      userPermissions: ["KickMembers"],
      options: [
        {
          name: "member",
          description: "Member to kick",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for kick",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");

    await member.kick(this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Member Kicked");
    embed.setDescription(`Successfully kicked ${member.user.username}`);

    cmd.reply({ embeds: [embed] });
  }
}
