const { SlashCommandBuilder } = require('discord.js');
const isMod = require('../functions/roleCheck.js').isMod;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		if(isMod(interaction.member, "Mod")) {
			interaction.reply('Pong!');	
		} else {
			interaction.reply('You are not permitted to do that.');
		}
	},
};