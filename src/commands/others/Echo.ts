import Command from "../../classes/Command";
import { ICommand } from "../../types";

export default class Cmd extends Command {
  public constructor() {
    super("echo", {
      category: "Misc",
      description: "Echo!",
      options: [
        {
          name: "input",
          description: "The message to echo",
          type: 3,
          required: true,
        },
      ],
    });
  }

  public async exec(cmd: ICommand): Promise<void> {
    const message = cmd.options.getString("input") || "No message provided";
    cmd.reply(message);
  }
}
