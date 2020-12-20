const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== "group") {
        var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdýþý") : (Durum == "idle" ? ("Boþta") : (Durum == "dnd" ? ("Rahatsýz Etmeyin") : ("Bilinmiyor/bulunamadý.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor('RANDOM')
      .setTimestamp()
      .addField('Ad:', message.author.username + '#' + message.author.discriminator)
      .addField('ID:', message.author.id)
      .addField('Kayýt tarihi:', message.author.createdAt)
      .addField('Durum:', durm)
      .addField('Þu an oynadýðý oyun:', message.author.presence.game ? message.author.presence.game.name : 'Þu an oyun oynamýyor')
      .addField('BOT mu?', message.author.bot ? '\n Evet' : 'Hayýr')
      console.log("!kullanýcýbilgim komutu " + message.author.username + " tarafýndan kullanýldý.")
      return message.channel.sendEmbed(kullanicibilgimk);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanýcý', 'kullanýcý bilgim', 'kbilgim'],
  permLevel: 0
};

exports.help = {
  name: 'kullanýcýbilgim',
  description: 'Komutu kullanan kiþi hakkýnda bilgi verir.',
  usage: 'kullanýcýbilgim'
};
