import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("setnick", {
      category: "Moderation",
      description: "Changes a member's nickname",
      botPermissions: ["ManageNicknames"],
      userPermissions: ["ManageNicknames"],
      options: [
        {
          name: "member",
          description: "Member to set nickname of",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "nickname",
          description: "The nickname to set",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for nickname set",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    const nick = cmd.options.getString("nickname");

    if (!member) return cmd.reply("Member not found.");
    if (!nick) return cmd.reply("Nickname not found.");

    await member.setNickname(nick, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Nickname Set");
    embed.setDescription(
      `Successfully set ${member.user.username}'s nickname to ${nick}`
    );
    cmd.reply({ embeds: [embed] });
  }
}
