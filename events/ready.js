const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const {ActivityType} = require("discord.js");


module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
    await client.user.setPresence({
      activities: [{ name: `Dev. by herzlos & barann & pcarrera911`, type: ActivityType.Playing }],
      status: 'dnd',
    });
    setInterval(function() {
      let totalMembers = 0;
      client.guilds.cache.forEach(guild => {
        totalMembers += guild.memberCount;
      });
      client.user.setPresence({
        activities: [{ name: `${client.guilds.cache.size} sunucuya ve ${totalMembers} kullanıcıya hizmet veriyorum.`, type: ActivityType.Listening }],
        status: 'dnd',
      });
    }, 10000)
  } catch (error) {
    console.error(error);
  }
  console.log(`${client.user.tag} Aktif!`);
};
