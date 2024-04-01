const { Client, EmbedBuilder, StringSelectMenuBuilder, Embed } = require("discord.js");
const axios = require('axios');

anailler = ["34", "6", "35", "16", "7", "1", "42", "63", "27", "41", "31"]
module.exports = {
  name: "büyükşehirler",
  description: "31 Mart 2024 Yerel Seçimleri Güncel Büyükşehir Verilerini Verir.",
  type: 1,
  options: [
  ],

  run: async (client, interaction) => {
    const { user, guildId, channel } = interaction;

    console.log(`Komut Kullanıldı, Kullanılan Sunucu [\x1b[36m${interaction.member.guild.memberCount}\x1b[0m] : \x1b[33m${interaction.member.guild.name}\x1b[0m | discord.gg/\x1b[35m${interaction.member.guild.vanityURLCode}\x1b[0m`);

    // if (selectedProvince < 1 || selectedProvince > 81) {
    //   return interaction.reply(`Hata: Geçersiz il numarası. Lütfen 1 ile 81 arasında bir sayı girin.`);
    // }

    try {
      const request = await axios.get(`https://api.yerelsecimsonuclari.org.tr/api/get/belediyesecim`);
      if (request.data.status) {
        let fields = [];
        anailler.forEach((ilkodu) => {
          const element = request.data.data[ilkodu];
          fields.push({ name: `${element.iladi}`, value: `\`\`\`fix
» ${element.adaylar[0].isim} (%${element.adaylar[0].oyorani})  (${element.adaylar[0].partiismi})\`\`\`` , inline: true});
        });
        // request.data.data.adaylar.forEach((aday, index) => {
        //   if (index < 10) {
        //     
        //   }
        // });
        // const embed = new EmbedBuilder()
        //   .setTitle(`TEST`)


          const embed = new EmbedBuilder()
          .setTitle(`BÜYÜKŞEHİRLER | YEREL SEÇİM 2024`)
          .setURL("https://yerelsecimsonuclari.xyz/")
          .setColor("#4345d8")
          .addFields(fields)
          .setDescription("Burada belirlediğimiz **11** büyük il'in en çok oya sahip **1. adayı** gözükmektedir.")
          .setFooter({ iconURL: interaction.guild.iconURL({dynamic: true}) , text: "yerelsecimsonuclari.xyz"})


    
        interaction.reply({ embeds: [embed]})
      } else {
        const embed = new EmbedBuilder()
        .setTitle(reques.data.message)
  
        interaction.reply({ embeds: [embed]})
      }
    } catch (error) {
      console.log(error);
      const embed = new EmbedBuilder()
      .setTitle(`HATA API HATA`)

      interaction.reply({ embeds: [embed]})
      
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