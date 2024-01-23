import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";
import { findOrCreateGuild } from "@/mongodb";

export default class Cmd extends Command {
  public constructor() {
    super("log-channel", {
      category: "Config",
      description: "Sets a channel for moderation logs",
      botPermissions: ["ViewAuditLog"],
      userPermissions: ["ViewAuditLog"],
      options: [
        {
          name: "channel",
          description: "The channel to set",
          type: ApplicationCommandOptionType.Channel,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const channel = cmd.options.getChannel("channel");

    const db = await findOrCreateGuild(cmd.guild!.id);
    if (!channel) {
      db.log.enabled = false;
      await db.save();

      const embed = new EmbedBuilder();
      embed.setTitle("Log Channel");
      embed.setDescription("Successfully disabled log channel");

      cmd.reply({ embeds: [embed] });
    } else {
      db.log.enabled = true;
      db.log.channel = channel!.id;
      await db.save();

      const embed = new EmbedBuilder();
      embed.setTitle("Log Channel");
      embed.setDescription(`Successfully set log channel to ${channel}`);

      cmd.reply({ embeds: [embed] });
    }
  }
}
