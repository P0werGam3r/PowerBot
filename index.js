const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdir("./commands/" , (err, files) => {
	
	if(err) console.log(err);

	var jsFiles = files.filter(f => f.split(".").pop() === "js");

	if(jsFiles.length <= 0) {
		console.log("kon geen files vinden");
		return;
	}

	jsFiles.forEach((f, i) => {
		var fileGet = require(`./commands/${f}`);
		console.log(`de file ${f} is geladen`);

		client.commands.set(fileGet.help.name, fileGet);
	})
});


client.once('ready', () => {
    console.log('Ready!');
	client.user.setActivity("!info", {type: "PLAYING"});
	
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	var commands = client.commands.get(command.slice(prefix.length));

	if(commands) command.run(bot,message, args);


	//if (command === 'ping') {
	//	message.channel.send('Pong.');
	//} else if (command === 'beep') {
	//	message.channel.send('Boop.');
    //}

    if (command === 'info') {
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#00FFE0 ')
	.setTitle('Information')
	.setAuthor('PowerBot', 'https://i.imgur.com/OtyopUA.png', 'http://magicplacecraftpanel.ga/')
    .setDescription('Website: http://magicplacecraftpanel.ga/ \n IP: magicplacecraft.mc-node.net \n Discord Commands: \n !info \n !members \n !ping')
	.setThumbnail('')
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: 'Instagram:', value: 'https://www.instagram.com/magicplace_craft/?hl=nl', inline: true },
	
	)
	
	.setTimestamp()
	.setFooter( 'CoppyRight® PowerBot', 'https://i.imgur.com/OtyopUA.png');

    message.channel.send(exampleEmbed);
    }
    if(message.content == "!ping"){ // Check if message is "!ping"
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
			});
        }
		if(command === 'members'){
			const membersEmbed = new Discord.MessageEmbed()
			.setColor('#00FFE0 ')
			.setAuthor('Members', 'https://i.imgur.com/OtyopUA.png')
			.setDescription('Server: ' + `${message.guild.name}` + "\nMembers: " + `${message.guild.memberCount}`)
			.setTimestamp()
			.setFooter( 'CoppyRight® PowerBot', 'https://i.imgur.com/OtyopUA.png');
		
			message.channel.send(membersEmbed);
		}

	if(command === 'kick'){
			if(!message.member.hasPermission("KICK_MEMBERS")) {
				return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
			  }
			  
			if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
				return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
			  }
			  let target = message.mentions.members.first();
    
			  if(!target) {
				return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
			  }
			  if(target.id === message.author.id) {
				return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
			   }
			   if(!args[1]) {
				return message.channel.send(`**${message.author.username}**, Please Give Reason to kick`)
			  }
			  let kickEmbed = new Discord.MessageEmbed()
    		.setTitle("Action: Kick")
    		.setDescription(`kickeed ${target} (${target.id})`)
    		.setColor("#00FFE0 ")
    		.setFooter(`Kicked by ${message.author.username}`);
    
				message.channel.send(kickEmbed)
				target.kick(args[1]);
			}
			if(command === 'ban'){
				if(!message.member.hasPermission("BAN_MEMBERS")) {
					return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
				  }
				  
				if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
					return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
				  }
				  let target = message.mentions.members.first();
		
				  if(!target) {
					return message.channel.send(`**${message.author.username}**, Please mention the person who you want to kick`)
				  }
				  if(target.id === message.author.id) {
					return message.channel.send(`**${message.author.username}**, You can not kick yourself`)
				   }
				   if(!args[1]) {
					return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
				  }
				  let kickEmbed = new Discord.MessageEmbed()
				.setTitle("Action: ban")
				.setDescription(`Banned ${target} (${target.id})`)
				.setColor("#00FFE0 ")
				.setFooter(`Kicked by ${message.author.username}`);
		
					message.channel.send(kickEmbed)
					target.ban(args[1]);
				}
				switch(args[0]){
					case 'mc':

						ping('magicplacecraft.mc-node.net', 25596, (error, reponse) =>{
							if(error) throw error
							const embedServer = new RichEmbed()
							.setColor('#00FFE0 ')
							.setTitle('Server Status')
							.addField('Server IP', reponse.host)
							.addField('Server Version', reponse.version)
							.addField('Online Players', reponse.onlinePlayers)
							.addField('Max Players', reponse.maxPlayers)
						   
							message.channel.send(embedServer)
						})
					break
				}
});

client.login(process.env.token);