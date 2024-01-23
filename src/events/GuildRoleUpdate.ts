import { EmbedBuilder, Events, Role } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildRoleUpdate);
  }

  public async run(role: Role, newRole: Role): Promise<void> {
    const channel = await this.getLogChannel(role.guild);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Role Updated")
      .addFields([
        {
          name: "Role",
          value: role.name,
          inline: true,
        },
        {
          name: "New Role",
          value: newRole.name,
          inline: true,
        },
      ])
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
}
