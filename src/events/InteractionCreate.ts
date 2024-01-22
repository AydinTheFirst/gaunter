import Event from "../classes/Event";
import { Events, Interaction, TextChannel } from "discord.js";
import { ICommand } from "@/types";
import { buttonHandler } from "@/utils/tickets";

export default class InteractionCreate extends Event {
  public constructor() {
    super(Events.InteractionCreate);
  }

  public async run(interaction: Interaction): Promise<any> {
    const client = interaction.client;

    if (interaction.isChatInputCommand()) {
      commandHandler(client, interaction);
    }

    if (interaction.isButton()) {
      try {
        await buttonHandler(client, interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: "There was an error while executing this command: " + error,
          ephemeral: true,
        });
      }
    }
  }
}

const commandHandler = async (client: CustomClient, interaction: ICommand) => {
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
    await command.exec(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command: " + error,
      ephemeral: true,
    });
  }
};
