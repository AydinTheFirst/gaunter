import { Interaction, TextChannel } from "discord.js";
import Event from "../classes/Event";
import { CustomClient } from "../types/types";

export default class InteractionCreate extends Event {
  public constructor() {
    super("interactionCreate");
  }

  public async run(interaction: Interaction): Promise<any> {
    const client = interaction.client as CustomClient;

    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = client.commands?.get(interaction.commandName);

    if (!command) return;

    if (command.disabled) {
      return interaction.reply({
        content: "This command is disabled",
        ephemeral: true,
      });
    }

    const channel = interaction.channel as TextChannel;

    const missingPerms: {
      user: string[] | undefined;
      bot: string[] | undefined;
    } = {
      user: [],
      bot: [],
    };

    if (command.botPermissions) {
      missingPerms.bot = channel
        .permissionsFor(client.user!)
        ?.missing(command.botPermissions);
    }

    if (command.userPermissions) {
      missingPerms.user = channel
        .permissionsFor(interaction.user)
        ?.missing(command.userPermissions);
    }

    if (missingPerms.bot?.length || missingPerms.user?.length) {
      return interaction.reply({
        content: `Missing Perms:\n
          ${missingPerms.user?.join(", ") || ""}
          ${missingPerms.bot?.join(", ") || ""}`,
        ephemeral: true,
      });
    }

    try {
      console.log("Running command: " + command.name);
      await command.exec(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command: " + error,
        ephemeral: true,
      });
    }
  }
}
