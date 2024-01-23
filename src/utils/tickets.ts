import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
} from "discord.js";

import { findOrCreateGuild } from "../mongodb";
import { Client } from "discord.js";

export const buttonHandler = async (
  client: Client,
  interaction: ButtonInteraction
) => {
  if (interaction.customId === "ticketClose") {
    closeTicketHandler(client, interaction);
  }

  if (interaction.customId === "ticketCreate") {
    createTicketHandler(client, interaction);
  }
};

export const closeTicketHandler = async (
  _: any,
  interaction: ButtonInteraction
) => {
  const db = await findOrCreateGuild(interaction.guildId!);

  const channel = interaction.channel!;
  db.ticket.cache = db.ticket.cache.filter((c) => c.channel !== channel.id);

  await db.save();

  interaction.reply({
    content: `Ticket closed!`,
    ephemeral: true,
  });

  setTimeout(() => {
    channel.delete();
  }, 3000);
};

export const createTicketHandler = async (
  _: any,
  interaction: ButtonInteraction
) => {
  const db = await findOrCreateGuild(interaction.guildId!);
  const activeTicket = db.ticket.cache.find(
    (c) => c.user === interaction.user.id
  );

  if (activeTicket) {
    return interaction.reply({
      content: `You already have a ticket open! at <#${activeTicket.channel}>`,
      ephemeral: true,
    });
  }

  let ticketCategory = interaction.guild?.channels.cache.get(
    db.ticket.category
  );

  if (!ticketCategory) {
    ticketCategory = await interaction.guild?.channels.create({
      name: "Tickets",
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: interaction.guildId!,
          deny: ["ViewChannel"],
        },
      ],
      position: 0,
    });

    db.ticket.category = ticketCategory!.id;
  }

  const ticketChannel = await interaction.guild?.channels.create({
    name: `ticket-${1000 + db.ticket.count + 1}`,
    parent: ticketCategory!.id,
    permissionOverwrites: [
      {
        id: interaction.guildId!,
        deny: ["ViewChannel"],
      },
      {
        id: interaction.user.id,
        allow: ["ViewChannel"],
      },
    ],
  });

  db.ticket.cache.push({
    channel: ticketChannel!.id,
    user: interaction.user.id,
  });

  db.ticket.count++;

  await db.save();

  const embed = new EmbedBuilder();
  embed.setTitle(`${interaction.guild?.name}'s Support`);
  embed.setDescription(
    "Support will be with you shortly.\nTo close this ticket react with 🔒"
  );
  embed.setColor("Random");

  const button = new ButtonBuilder();
  button.setLabel(`Close Ticket`);
  button.setCustomId("ticketClose");
  button.setStyle(ButtonStyle.Danger);
  button.setEmoji("🔒");

  const row = new ActionRowBuilder<ButtonBuilder>();
  row.addComponents(button);

  ticketChannel?.send({
    content: `<@${interaction.user.id}>, Welcome`,
    embeds: [embed],
    components: [row],
  });

  interaction.reply({
    content: `Ticket created! => <#${ticketChannel!.id}>`,
    ephemeral: true,
  });
};
