import { EmbedBuilder, Events, GuildChannel } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.ChannelDelete);
  }

  public async run(channel: GuildChannel): Promise<void> {
    const log = await this.getLogChannel(channel.guild);
    if (!log) return;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Channel Deleted")
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
      .setTimestamp();

    log.send({ embeds: [embed] });
  }
}
