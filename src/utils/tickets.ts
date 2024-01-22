import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
  ColorResolvable,
  EmbedBuilder,
} from "discord.js";

import { findOrCreateGuild } from "../mongodb/mongoose";
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
  client: CustomClient,
  interaction: ButtonInteraction
) => {
  const db = await findOrCreateGuild(interaction.guildId!);
  const ticketCh = db.ticket.cache.find(
    (c) => c.channel === interaction.channel!.id
  );

  const ticketChannel = interaction.guild?.channels.cache.get(
    ticketCh!.channel
  );

  if (!ticketChannel) {
    return interaction.reply({
      content: `This channel is not a ticket!`,
      ephemeral: true,
    });
  }

  db.ticket.cache = db.ticket.cache.filter(
    (c) => c.channel !== ticketChannel.id
  );

  await db.save();

  interaction.reply({
    content: `Ticket closed!`,
    ephemeral: true,
  });

  setTimeout(() => {
    ticketChannel.delete();
  }, 5000);
};

export const createTicketHandler = async (
  client: CustomClient,
  interaction: ButtonInteraction
) => {
  const db = await findOrCreateGuild(interaction.guildId!);
  const ticketCh = db.ticket.cache.find((c) => c.user === interaction.user.id);

  if (ticketCh) {
    return interaction.reply({
      content: `You already have a ticket open! at <#${ticketCh.channel}>`,
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
    name: `ticket-${1000 + db.ticket.cache.length + 1}`,
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

  await db.save();

  const embed = new EmbedBuilder();
  embed.setTitle(
    db.ticket.message.title || `${interaction.guild?.name}'s Support`
  );
  embed.setDescription(
    db.ticket.message.description ||
      "Support will be with you shortly.\nTo close this ticket react with 🔒"
  );
  embed.setColor((db.ticket.message.color as ColorResolvable) || "Random");

  const button = new ButtonBuilder();
  button.setLabel(db.ticket.message.label || `Close Ticket`);
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
