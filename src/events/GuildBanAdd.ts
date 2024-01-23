import { EmbedBuilder, Events, GuildMember } from "discord.js";
import Event from "../classes/Event";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildBanAdd);
  }

  public async run(member: GuildMember): Promise<void> {
    const log = await this.getLogChannel(member.guild);
    if (!log) return;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Member Banned")
      .addFields([
        {
          name: "Member",
          value: member.user.tag,
          inline: true,
        },
        {
          name: "ID",
          value: member.id,
          inline: true,
        },
      ])
      .setTimestamp();

    log.send({ embeds: [embed] });
  }
}
