const { SlashCommandBuilder } = require('discord.js')
const fs = require('fs')
const messageText = fs.readFileSync('templates/welcome-and-rules.txt', 'utf8')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('post-rules')
		.setDescription('Posts latest rules into the rules channel.'),
	async execute(interaction) {

		
		// Get the channel
		const channel = interaction.client.channels.resolve('1029670108206989384')


		// Prepare the new message (embed)
		const { EmbedBuilder } = require('discord.js')




		// First clear the channel of old messages
		await channel.bulkDelete(100)
			.then((messages) => {
				console.log(`Bulk deleted ${messages.size} messages`)

				// Post the new message
				channel.send(messageText)
				  	.then((message) => {
						interaction.reply(`Welcome and rules posted to: ${channel.name}`)
					})
				  	.catch(console.error)

			})
		  	.catch(console.error)


	},
}