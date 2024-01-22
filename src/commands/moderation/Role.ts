import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("role", {
      category: "Moderation",
      description: "Changes role of a member",
      botPermissions: ["ManageRoles"],
      userPermissions: ["ManageRoles"],
      options: [
        {
          name: "member",
          description: "Member to change role",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "role",
          description: "Role to change to",
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
        {
          name: "action",
          description: "Action to perform",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: "Add",
              value: "add",
            },
            {
              name: "Remove",
              value: "remove",
            },
          ],
        },
        {
          name: "reason",
          description: "Reason for ban",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<any> {
    const member = await this.getMember(cmd);
    const role = cmd.options.getRole("role");
    const action = cmd.options.getString("action") === "add";

    if (!member) return cmd.reply("Member not found.");
    if (!role) return cmd.reply("Role not found.");
    if (!action) return cmd.reply("Action not found.");

    await member.roles[action ? "remove" : "add"](role.id, this.reason(cmd));

    const embed = new EmbedBuilder();
    embed.setTitle(`Changed ${member.user.username}'s role`);
    embed.setDescription(
      `${action ? "Removed" : "Added"} ${role.name} to ${member.user.username}`
    );

    cmd.reply({ embeds: [embed] });
  }
}
