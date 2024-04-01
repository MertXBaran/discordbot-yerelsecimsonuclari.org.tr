const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");

/* Slash Komutları Yüklüyoruz */

readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});


/* Slash Komutları Yüklüyoruz */

/* Eventleri Yüklüyoruz */

readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
    eve(client, ...args)
  });

  console.log(`[EVENT] ${name} eventi yüklendi.`)
  
});

client.on('guildCreate', (guild) => {
  console.log(`Bot, \x1b[33m${guild.name}\x1b[0m [\x1b[36m${guild.memberCount}\x1b[0m] sunucusuna eklendi. Sahibi: \x1b[35m${guild.ownerId}\x1b[0m`);

});

client.on('guildDelete', (guild) => {
  console.log(`Bot GG, \x1b[33m${guild.name}\x1b[0m [\x1b[36m${guild.memberCount}\x1b[0m] sunucusundan atıldı. Sahibi: \x1b[35m${guild.ownerId}\x1b[0m`);

});

/* Eventleri Yüklüyoruz */
client.login(TOKEN).then(app => {
  console.log(`[BOT] Token girişi başarılı.`)
}).catch(app => {
  console.log(`[BOT] Token girşi başarısız.`)
})
