import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types/types";
import ms from "ms";

export default class Cmd extends Command {
  public constructor() {
    super("timeout", {
      category: "Moderation",
      description: "Timeouts a member",
      options: [
        {
          name: "member",
          description: "Member to timeout",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "time",
          description: "Duration for timeout",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "reason",
          description: "Reason for timeout",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");
    const time = cmd.options.getString("time") || "28d";

    const duration = ms(time);

    await member.timeout(duration, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Member Timed Out");
    embed.setDescription(`Successfully timed out ${member.user.username}`);

    cmd.reply({ embeds: [embed] });
  }
}
