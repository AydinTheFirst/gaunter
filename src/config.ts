const clientId = "1005419077679972422";
const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot%20applications.commands&permissions=8`;
const botName = "Gaunter";
const botFullName = "Gaunter O'Dimm";
const github = "https://github.com/AydinTheFirst/gaunter";
const guildId = "1076823949360500767";
const prefix = "$";

export default {
  clientId,
  inviteLink,
  botName,
  botFullName,
  github,
  guildId,
  prefix,
} as const;
