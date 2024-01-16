import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";

export default class Cmd extends Command {
  public constructor() {
    super("ban", {
      category: "Moderation",
      description: "Bans a member",
      options: [
        {
          name: "member",
          description: "Member to ban",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for ban",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");

    await member.ban({ reason: this.reason(cmd) });

    const embed = new EmbedBuilder();
    embed.setTitle("Member Banned");
    embed.setDescription(`Successfully banned ${member.user.username}`);

    cmd.reply({ embeds: [embed] });
  }
}
