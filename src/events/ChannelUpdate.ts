import { EmbedBuilder, Events, GuildChannel } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.ChannelUpdate);
  }

  public async run(
    channel: GuildChannel,
    newChannel: GuildChannel
  ): Promise<void> {
    const log = await this.getLogChannel(channel.guild);
    if (!log) return;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Channel Updated")
      .addFields([
        {
          name: "Channel",
          value: channel.name,
          inline: true,
        },
        {
          name: "Type",
          value: channel.type.toString(),
          inline: true,
        },
      ])

      .addFields([
        {
          name: "New Channel",
          value: newChannel.name,
          inline: true,
        },
        {
          name: "New Type",
          value: newChannel.type.toString(),
          inline: true,
        },
      ])

      .setTimestamp();

    log.send({ embeds: [embed] });
  }
}
