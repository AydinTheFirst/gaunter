import { EmbedBuilder, Events, Role } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildRoleCreate);
  }

  public async run(role: Role): Promise<void> {
    const channel = await this.getLogChannel(role.guild);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Role Created")
      .setDescription(role.name)
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
}
