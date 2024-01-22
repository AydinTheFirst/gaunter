import {
  APIApplicationCommand,
  BitFieldResolvable,
  PermissionsString,
} from "discord.js";

import { ICommand } from "../types";
export interface CommandOptions {
  aliases?: string[];
  category?: string;
  description?: string;
  disabled?: boolean;
  botPermissions?: BitFieldResolvable<PermissionsString, bigint>[];
  userPermissions?: BitFieldResolvable<PermissionsString, bigint>[];
  options?: APIApplicationCommand["options"];
}

export default class Command implements CommandOptions {
  public name: string;
  public aliases: string[];
  public category: string;
  public description: string;
  public disabled: boolean;
  public options?: CommandOptions["options"];
  public botPermissions?: BitFieldResolvable<PermissionsString, bigint>[];
  public userPermissions?: BitFieldResolvable<PermissionsString, bigint>[];
  public constructor(name: string, options: CommandOptions) {
    this.name = name;
    this.aliases = options.aliases || [];
    this.category = options.category || "Misc";
    this.description = options.description || "No description provided";
    this.disabled = options.disabled || false;
    this.botPermissions = options.botPermissions || [];
    this.userPermissions = options.userPermissions || [];
    this.options = options.options;
  }

  public async exec(cmd: ICommand): Promise<void> {
    throw new Error(
      `The exec method has not been implemented by ${this.name} | ${cmd}`
    );
  }

  reason(command: ICommand) {
    return `Requested by ${
      command.user.username
    } at ${new Date()} with reason: ${
      command.options.getString("reason") || "No reason provided."
    } `;
  }

  async getMember(command: ICommand) {
    const user = command.options.getUser("member");
    if (!user) throw new Error("User not found.");
    const member = await command.guild?.members.fetch(user.id);
    if (!member) throw new Error("Member not found.");
    return member;
  }
}
