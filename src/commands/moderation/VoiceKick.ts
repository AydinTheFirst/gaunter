import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("vkick", {
      category: "Moderation",
      description: "Kicks a member from voice channel",
      botPermissions: ["MoveMembers"],
      userPermissions: ["MoveMembers"],
      options: [
        {
          name: "member",
          description: "Member to kick",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for voice kick",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    if (!member) return cmd.reply("Member not found.");

    await member.voice.disconnect(this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle("Member Kicked");
    embed.setDescription(
      `Successfully kicked ${member.user.username} from voice channel.`
    );

    cmd.reply({ embeds: [embed] });
  }
}
