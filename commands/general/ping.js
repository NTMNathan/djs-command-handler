import { SlashCommandBuilder } from 'discord.js';
import { stripIndents } from 'common-tags';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('The ping (latency) of the bot.')
		.setDMPermission(true),
	contextDescription: null,
	usage: 'ping',
	category: 'General',
	staffOnly: false,
	run: async (client, interaction) => {
		try {
			const now = Date.now();
			await interaction.deferReply();

			return await interaction.editReply({
				content: stripIndents`
				Pong! 🏓

				**⏱ Roundtrip:** ${Math.round(Date.now() - now)} ms
				**💓 API:** ${Math.round(client.ws.ping)} ms
            	`,
			});
		}
		catch (e) {
			return await interaction.followUp({
				content: stripIndents`
				**An error occurred while running \`${interaction.commandName}\`**
				
				\`\`\`
				${e.message}
				\`\`\`
				`,
			});
		}
	},
};