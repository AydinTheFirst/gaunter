import { EmbedBuilder, WebhookClient } from "discord.js";

export class Logger {
  webhook: WebhookClient;
  constructor() {
    this.webhook = new WebhookClient({
      url: process.env.logger!,
    });
  }

  public log(message: string): void {
    console.log(message);
    const embed = new EmbedBuilder();
    embed.setTitle("Log");
    embed.setDescription(message);
    embed.setColor("Blue");

    this.webhook.send({ embeds: [embed] });
  }

  public error(message: string): void {
    console.error(message);
    const embed = new EmbedBuilder();
    embed.setTitle("Error");
    embed.setDescription(message);
    embed.setColor("Red");

    this.webhook.send({ embeds: [embed] });
  }

  public warn(message: string): void {
    console.warn(message);
    const embed = new EmbedBuilder();
    embed.setTitle("Warn");
    embed.setDescription(message);
    embed.setColor("Yellow");

    this.webhook.send({ embeds: [embed] });
  }
}
