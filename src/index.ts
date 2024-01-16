import "dotenv/config";
import fs from "fs";
import Discord from "discord.js";
import { CustomClient } from "./types/types";
import "./utils/lynx";

const client: CustomClient = new Discord.Client({
  intents: [new Discord.IntentsBitField("3276799")],
  partials: [Discord.Partials.Channel],
});

client.commands = new Discord.Collection();
client.prefix = "$";
client.prod = process.env.NODE_ENV === "production";
client.devGuild = "1175490181088940032";

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  import(`./events/${file}`).then((event) => {
    const eventInstance = new event.default();
    client.on(eventInstance.name, (...args) => eventInstance.run(...args));
  });
}

const commandCategories = fs.readdirSync("./src/commands");

for (const category of commandCategories) {
  const commandFiles = fs
    .readdirSync(`./src/commands/${category}`)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    import(`./commands/${category}/${file}`).then((command) => {
      const commandInstance = new command.default();
      client.commands?.set(commandInstance.name, commandInstance);
    });
  }
}

client.login(process.env.DISCORD_TOKEN);
