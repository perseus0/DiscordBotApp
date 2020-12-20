const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var figlet = require('figlet');
    figlet(args.join(' '), function (err, data) {
      if (err) {
        console.log('Bir şeyler yanlış gitti...');
        console.dir(err);
        return;
      }
      message.delete()
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Ascii;')
      .setDescription('```fix\n' + data + '\n```')
      .setFooter('MeeTR', client.user.avatarURL)
      .setTimestamp()
      message.channel.send(embed);
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ascii'],
  permLevel: 1,
};

exports.help = {
  name: 'ascii',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'yaz [yazdırmak istediğiniz şey]'
};
