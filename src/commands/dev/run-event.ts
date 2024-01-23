import { EmbedBuilder, Events, GuildChannel } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

const eventsArray = [
  Events.MessageCreate,
  Events.GuildCreate,
  Events.GuildDelete,
  Events.GuildMemberAdd,
  Events.GuildMemberRemove,
  Events.GuildRoleCreate,
  Events.GuildRoleDelete,
  Events.GuildRoleUpdate,
  Events.ChannelCreate,
  Events.ChannelDelete,
  Events.ChannelUpdate,
  Events.GuildBanAdd,
  Events.GuildBanRemove,
];

export default class Cmd extends Command {
  public constructor() {
    super("event", {
      category: "Dev",
      description: "This is a developer command!",
      options: [
        {
          name: "input",
          description: "The event to run",
          type: 3,
          required: true,
          choices: eventsArray.map((event) => ({
            name: event,
            value: event,
          })),
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const event = cmd.options.getString("input")!;

    const client = cmd.client;
    const member = cmd.guild!.members.cache.get(client.user!.id)!;
    const channel = cmd.channel as GuildChannel;

    if (event === Events.GuildCreate) {
      client.emit(Events.GuildCreate, cmd.guild!);
    }

    if (event === Events.GuildDelete) {
      client.emit(Events.GuildDelete, cmd.guild!);
    }

    if (event === Events.GuildMemberAdd) {
      client.emit(Events.GuildMemberAdd, member);
    }

    if (event === Events.GuildMemberRemove) {
      client.emit(Events.GuildMemberRemove, member);
    }

    if (event === Events.GuildRoleCreate) {
      client.emit(Events.GuildRoleCreate, member.roles.cache.first()!);
    }

    if (event === Events.GuildRoleDelete) {
      client.emit(Events.GuildRoleDelete, member.roles.cache.first()!);
    }

    if (event === Events.GuildRoleUpdate) {
      client.emit(
        Events.GuildRoleUpdate,
        member.roles.cache.first()!,
        member.roles.cache.first()!
      );
    }

    if (event === Events.ChannelCreate) {
      client.emit(Events.ChannelCreate, channel as any);
    }

    if (event === Events.ChannelDelete) {
      client.emit(Events.ChannelDelete, channel as any);
    }

    if (event === Events.ChannelUpdate) {
      client.emit(Events.ChannelUpdate, channel as any, channel as any);
    }

    if (event === Events.GuildBanAdd) {
      client.emit(Events.GuildBanAdd, member);
    }

    if (event === Events.GuildBanRemove) {
      client.emit(Events.GuildBanRemove, member);
    }

    const embed = new EmbedBuilder();
    embed.setTitle("Event");
    embed.setDescription(`Running event ${event}`);

    cmd.reply({ embeds: [embed] });
  }
}
