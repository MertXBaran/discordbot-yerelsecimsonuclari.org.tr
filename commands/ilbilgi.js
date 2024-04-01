const {
  Client,
  EmbedBuilder,
  StringSelectMenuBuilder,
  Embed
} = require("discord.js");
const axios = require('axios');

sonuclaraa = {}
module.exports = {
  name: "il-bilgi",
  description: "31 Mart 2024 Yerel Seçimleri Güncel İl Verilerini Verir.",
  type: 1,
  options: [{
      name: "il",
      description: "Bir il plaka kodu giriniz.",
      type: 4, // Type 4 represents an integer
      required: true
  }],

  run: async (client, interaction) => {
      const {
          user,
          guildId,
          channel
      } = interaction;
      const selectedProvince = interaction.options.getInteger('il');

      console.log(`Komut Kullanıldı, Kullanılan Sunucu [\x1b[36m${interaction.member.guild.memberCount}\x1b[0m] : \x1b[33m${interaction.member.guild.name}\x1b[0m | discord.gg/\x1b[35m${interaction.member.guild.vanityURLCode}\x1b[0m`);

      if (selectedProvince < 1 || selectedProvince > 81) {
          return interaction.reply(`Hata: Geçersiz il numarası. Lütfen 1 ile 81 arasında bir sayı girin.`);
      }

      try {
          const request = await axios.get(`https://api.yerelsecimsonuclari.org.tr/api/get/belediyesecim/${selectedProvince}`);



          if (request.data.status) {
            let fields = [];
            request.data.data.adaylar.forEach((aday, index) => {
              if (index < 10) {
                fields.push({ name: `${aday.isim}`, value: `\`\`\`fix
» ${aday.oysayisi.toLocaleString()} | %${aday.oyorani}\`\`\`` , inline: true})
              }
            });
            
            const embed = new EmbedBuilder()
              .setTitle(`YEREL SEÇİMLER 2024 | ${request.data.data.iladi}`)
              .setURL("https://yerelsecimsonuclari.xyz/")
              .setColor("#4345d8")
              .addFields(fields)
              .setFooter({ iconURL: interaction.guild.iconURL({dynamic: true}) , text: "yerelsecimsonuclari.xyz"})
//               .setThumbnail(interaction.guild.iconURL({dynamic: true}))
//               .setThumbnail
              .setDescription(`<:king_crown:1037747420639010826>・ **İl Adı:** \`${request.data.data.iladi}\`
<a:5961darkbluetea:1037418919566266408>・ **İl Kodu:** \`${request.data.data.ilkodu}\` 

<a:utility:1037737831126290453> ・ **Toplam Sandık:** \`${request.data.data.toplamsandik}\`
<a:grsaqw:1044998495674826813> ・ **Açılan Sandık:** \`${request.data.data.acilansandik} | %${request.data.data.acilansandikyuzde}\`

<a:onay:1003250860668747776> ・ **Geçerli Oy:** \`${request.data.data.gecerlioysayisi}\` 
<a:red:1003089010173956198> ・ **Geçersiz Oy:** \`${request.data.data.gecersizoysayisi}\`

<:8676gasp:1037482763185561650> ・ **Toplam Oy & Katılım Oranı:** \`${request.data.data.toplamoyvereceknufus} | %${request.data.data.katilimorani}\`
`)
// .setDescription(`<:king_crown:1037747420639010826>・ \`İl Adı:\` **${request.data.data.iladi}**
// <a:5961darkbluetea:1037418919566266408>・ \`İl Kodu:\` **${request.data.data.ilkodu}** 

// <a:utility:1037737831126290453>・   \`Toplam Sandık:\` **${request.data.data.toplamsandik}**
// <a:grsaqw:1044998495674826813> ・ \`Açılan Sandık:\` **${request.data.data.acilansandik} | %${request.data.data.acilansandikyuzde}**

// <a:onay:1003250860668747776> ・ \`Geçerli Oy:\` **${request.data.data.gecerlioysayisi}** 
// <a:red:1003089010173956198> ・  \`Geçersiz Oy:\` **${request.data.data.gecersizoysayisi}**

// <:8676gasp:1037482763185561650> ・ \`Toplam Oy & Katılım Oranı:\` **${request.data.data.toplamoyvereceknufus} | %${request.data.data.katilimorani}**
// `)

            interaction.reply({
                embeds: [embed]
            })
          } else {
              const embed = new EmbedBuilder()
                  .setTitle(reques.data.message)

              interaction.reply({
                  embeds: [embed]
              })
          }
      } catch (error) {
          console.log(error);
          const embed = new EmbedBuilder()
              .setTitle(`HATA API HATA`)

          interaction.reply({
              embeds: [embed]
          })

      }
  }
};

function convertNumber(number) {
  // Başındaki sıfırları ve noktaları kaldırma
  var stringNumber = String(number);
  var formattedNumber = '';
  var separatorCount = 0;

  for (var i = stringNumber.length - 1; i >= 0; i--) {
      formattedNumber = stringNumber[i] + formattedNumber;
      separatorCount++;

      if (separatorCount === 3 && i !== 0) {
          formattedNumber = '.' + formattedNumber;
          separatorCount = 0;
      }
  }

  return formattedNumber;
}