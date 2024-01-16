import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";

export default class Cmd extends Command {
  public constructor() {
    super("unban", {
      category: "Moderation",
      description: "Unbans a member",
      options: [
        {
          name: "member",
          description: "Member to unban",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for unban",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");

    await member.guild.members.unban(member.id, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Member Unbanned");
    embed.setDescription(`Successfully unbanned ${member.user.username}`);

    cmd.reply({ embeds: [embed] });
  }
}
