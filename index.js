const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!') // Writes ready in the console when the bot has started
});

client.login('ODAzMjA3NzQyMjU2MTg1MzU1.YA6bgA.85xn1qFK8LJQv321-60KhzFj9aA'); //Logs into Discord and lets users interact with the bot

client.on('message', message => { //When a user sends a message
  const prefix = "1"; //

if(message.author.bot) return; // Stops if the message is from a bot
if(!message.content.startsWith(prefix)) return; // Stops if the message does not start with the set prefix

const args = message.content.slice(prefix.length).trim().split(/ +/g); // Splits the message up into args to handle commands easier
const cmd = args.shift().toLowerCase(); // Shifts all the args to lowercase to make taking input easier

if(cmd === "info"){
  infoembed = new Discord.MessageEmbed()
 .setColor('#ec1c25')
 .setTitle('Information')
 .setAuthor('Bruckis')
 .setThumbnail('https://cdn.discordapp.com/attachments/632895798559899663/809737369783238707/proxy-image.png')
 .addField("This is a bot where you and up to 9 other friends can compete in a game of UNO", 'Just start me up using startgame and I will do the rest!' )
 .setFooter('This is not finished yet')
 return message.channel.send(infoembed);
}

});
