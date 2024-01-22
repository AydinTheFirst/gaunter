import { Collection } from "discord.js";
import { Logger } from "./utils/Logger";
import Command from "./classes/Command";

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
    prefix: string;
    prod: boolean;
    devGuild: string;
    logger: Logger;
  }
}
