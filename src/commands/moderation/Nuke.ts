import { EmbedBuilder, TextChannel } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("nuke", {
      category: "Moderation",
      description: "Do not execute if you don't know what this does",
      botPermissions: ["ManageChannels"],
      userPermissions: ["Administrator"],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const channel = cmd.channel as TextChannel;

    cmd.reply("Nuking channel...");

    const newChannel = await channel.clone();
    await channel.delete();

    newChannel.setPosition(channel.position);

    const embed = new EmbedBuilder();
    embed.setTitle("Channel Nuked");
    embed.setImage("https://i.giphy.com/Iep1piW2Na91q0gWYX.gif");
    embed.setDescription(`Successfully nuked by ${cmd.user.username}`);

    newChannel.send({ embeds: [embed] });
  }
}
