const fs = require('node:fs');
const path = require('node:path');
const _ = require('underscore')
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST, Routes } = require('discord.js');

if (fs.existsSync('./config.json')) {
    var { clientId, guildId, token } = require('./config.json')
} else {
    var { clientId, guildId, token } = process.env.NODE_CONFIG
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// Setup events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Setup commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// What to do when command is called
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(`User ${interaction.user.tag} requested command: ${interaction.commandName}`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


// Go time
client.login(token);