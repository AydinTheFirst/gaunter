import Discord, { ChatInputCommandInteraction, Message } from "discord.js";
import Command from "../classes/Command";

export interface CustomClient extends Discord.Client {
  commands?: Discord.Collection<string, Command>;
  prefix?: string;
  prod?: boolean;
  devGuild?: string;
}

export type ICtx = ChatInputCommandInteraction | Message;
export type ICommand = ChatInputCommandInteraction;
