const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('guildBanAdd' , (guild, user) => {
  let aramızakatılanlar = guild.channels.find('name', 'aramıza-katılanlar');
  if (!aramızakatılanlar) return;
  aramızakatılanlar.send('https://media.giphy.com/media/8njotXALXXNrW/giphy.gif **Adalet dağıtma zamanı gelmiş!** '+ user.username +'**Bakıyorum da suç işlemiş,Yargı dağıtmaya devam** :fist: :writing_hand:  :spy:' );

});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
      msg.reply('AleykümSelam , Hoşgeldin!  Nasılsın ?  ');
  }
  if (msg.content.toLowerCase() === 'merhaba') {
    msg.reply('merhabaa :heart:');
  }
  if (msg.content.toLowerCase() === 'hey bot') {
    msg.reply('buyrun ;  İsteğinizi alayım');
  }
  if (msg.content.toLowerCase() === 'selam') {
    msg.reply('Aleykümselam, hoşgeldin nasılsın?');
  }
  if (msg.content.toLowerCase() === 'merhabalar') {
    msg.reply('Sanada Merrrrhabalar');
  }
  if (msg.content.toLowerCase() === 'mal') {
    msg.reply('Lütfen daha az argo kelime kullanalım.');
  }
  if (msg.content.toLowerCase() === 'gerizekalı') {
    msg.reply('Lütfen daha az argo kelime kullanalım.');
  }
  if (msg.content.toLowerCase() === 'aptal') {
    msg.reply('Lütfen daha az argo kelime kullanalım.');
  }
  if (msg.content.toLowerCase() === 'öküz') {
    msg.reply('Lütfen daha az argo kelime kullanalım.');
  }
  if (msg.content === 'ping') {
    msg.reply('Pong! ping ');
  }
  if (msg.content.toLowerCase() === prefix + 'youtube' ) {
    msg.reply('Bot yapımcısı youtube kanalı - HusooTV')
  }
  if (msg.content.toLowerCase() === prefix + 'bot davet' ) {
    msg.reply('https://discordapp.com/oauth2/authorize?client_id=606930624519077908&scope=bot&permissions=2087971903')
  }
  if (msg.content.toLowerCase() === prefix + 'iletişim' ) {
    msg.reply('Gmail - htanriverdi147@gmail.com')
  }

});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
