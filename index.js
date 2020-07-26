require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const {
    MessageAttachment
} = require('discord.js');

const dogeify = require('dogeify-js');
const fetch = require("node-fetch");
const { createCanvas, loadImage } = require('canvas')

const prefix = "?";
const commands = ["?doge", "?swole", "?meme", "?doggo"];

const file = new Discord.MessageAttachment('./swole.jpg');

const TOKEN = process.env.TOKEN;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.on('message', async message => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(' ');
        args[0]=args[0].toLowerCase()
        console.log(args)
        let taggedUser = args[1]
        if(!args[1]){
            taggedUser = message.author;
        }
        else {
            taggedUser = args[1]
        }
        if(args[0]=="info" || args[0]=="help" ) {
            let r = `Available commands ${commands}`
            message.channel.send(r);
            }
        if (args[0]=="doge") {
            let doggle = message.content.replace('?doge', '');
            console.log(doggle);
            let dogespeak = await dogeify(doggle)
            console.log(dogespeak);
            message.channel.send(dogespeak);
        }
        
        if (args[0] == "meme") {

            const response = await fetch("https://meme-api.herokuapp.com/gimme/doge");
            const meme = await response.json();
            const lememe = new Discord.MessageEmbed()
                .setColor('#c6b17c')
                .setTitle(`${meme.title}`)
                .setURL(`${meme.postLink}`)
                .setAuthor(`r/${meme.subreddit}`)
                .setImage(`${meme.url}`)
            message.channel.send(lememe);


        }
        if (args[0] == "doggo") {

            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const meme = await response.json();
            const lememe = new Discord.MessageEmbed()
                .setColor('#c6b17c')
                .setTitle('Random Doggo')
                .setImage(`${meme.message}`)
            message.channel.send(lememe);


        }
        if(args[0]=="swole"){
            const canvas = createCanvas(750, 1000);
            const ctx = canvas.getContext('2d');
            const kek = getUserFromMention(args[1]);
            if (!kek) {
              return message.reply('no usar tagd! 🐕');
            }
            let image1 = await loadImage(message.mentions.users.first().displayAvatarURL({'format':'png'}));
      
            await loadImage('./swole.jpg').then((image) => {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              ctx.drawImage(image1, 310, 80,200,200);
      
            })
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'swole.jpg');
            message.channel.send(attachment);
          }
    }
});


client.login(TOKEN);