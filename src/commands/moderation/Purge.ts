import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";

import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("clean", {
      aliases: ["purge"],
      category: "Moderation",
      description: "Cleans up channel messages.",
      botPermissions: ["ManageMessages"],
      userPermissions: ["ManageMessages"],
      options: [
        {
          name: "member",
          description: "Member to delete messages from",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "amount",
          description: "Aount of messages to purge",
          type: ApplicationCommandOptionType.Integer,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const user = cmd.options.getUser("member");

    const channel = cmd.channel as TextChannel;

    if (user) {
      const member = await this.getMember(cmd);
      const messages = await cmd.channel!.messages.fetch();
      const memberMessages = messages.filter((m) => m.author.id === member.id);
      await channel.bulkDelete(memberMessages);
    } else {
      const amount = cmd.options.getInteger("amount") || 100;
      if (isNaN(amount)) return cmd.reply("Invalid amount.");
      const messages = await channel.messages.fetch({ limit: amount });
      await channel.bulkDelete(messages);
    }

    const embed = new EmbedBuilder();
    embed.setTitle("Messages Deleted");
    embed.setDescription(
      `Successfully deleted ${user ? "member" : "channel"} messages`
    );

    cmd.reply({ embeds: [embed], ephemeral: true });
  }
}
