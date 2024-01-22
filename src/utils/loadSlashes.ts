import { Client } from "discord.js";
import { REST, Routes } from "discord.js";

export default class SlashCommandLoader {
  public constructor(private client: Client) {}

  public async load(): Promise<void> {
    const rest = new REST().setToken(this.client.token!);
    const commands = this.client.commands?.toJSON();

    if (!commands) return console.error("No commands found.");

    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data: any = await rest.put(
        Routes.applicationGuildCommands(
          this.client.user!.id,
          this.client.devGuild!
        ),
        { body: commands }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error: any) {
      // And of course, make sure you catch and log any errors!
      console.error(JSON.stringify(error.rawError));
    }
  }
}
