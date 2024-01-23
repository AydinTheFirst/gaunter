import { EmbedBuilder, Events, GuildMember, TextChannel } from "discord.js";
import Event from "@/classes/Event";
import { findOrCreateGuild } from "@/mongodb";

export default class ClientEvent extends Event {
  public constructor() {
    super(Events.GuildMemberAdd);
  }

  public async run(member: GuildMember): Promise<void> {
    const db = await findOrCreateGuild(member.guild.id);
    if (!db.log.enabled) return;

    const channel = member.guild.channels.cache.get(
      db.log.channel
    ) as TextChannel;

    if (!channel) return;

    const embed = new EmbedBuilder();
    embed.setTitle("Member Joined");
    embed.setThumbnail(member.user.displayAvatarURL());
    embed.setDescription(
      `${member.user.tag} (${member.user.id}) joined the server!`
    );

    embed.addFields([
      {
        name: "Account Created",
        value: member.user.createdAt.toUTCString(),
      },
      {
        name: "Joined Server",
        value: member.joinedAt!.toUTCString(),
      },
      {
        name: "Member Count",
        value: member.guild.memberCount.toString(),
      },
    ]);

    embed.setTimestamp(new Date());
    embed.setColor("Green");

    channel.send({ embeds: [embed] });
  }
}
