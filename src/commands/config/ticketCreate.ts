import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("ticket-create", {
      category: "Config",
      description: "Creates a ticket",
      botPermissions: ["ManageChannels"],
      userPermissions: ["ManageChannels"],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const embed = new EmbedBuilder();
    embed.setTitle(`${cmd.guild?.name}'s Support`);
    embed.setDescription("To create a ticket react with 📩");
    embed.setColor("Random");
    embed.setThumbnail(cmd.guild!.iconURL());

    const button = new ButtonBuilder();
    button.setLabel(`Create Ticket`);
    button.setCustomId("ticketCreate");
    button.setStyle(ButtonStyle.Success);
    button.setEmoji("📩");

    const row = new ActionRowBuilder<ButtonBuilder>();
    row.addComponents(button);

    cmd.reply({
      content: "Ticket created!",
      ephemeral: true,
    });

    cmd.channel?.send({ embeds: [embed], components: [row] });
  }
}

export const createTicket = (guildId: string) => {
  console.log(guildId);
};
