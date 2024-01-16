import Command from "../../classes/Command";
import { ICommand } from "../../types/types";

export default class Cmd extends Command {
  public constructor() {
    super("ping", {
      category: "Misc",
      description: "Ping!",
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const ping = Math.round(cmd.client.ws.ping);
    cmd.reply(`Pong! ${ping}ms`);
  }
}
