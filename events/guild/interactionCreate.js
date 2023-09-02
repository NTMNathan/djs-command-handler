import { InteractionType } from 'discord.js';
import { stripIndents } from 'common-tags';

export default {
	name: 'interactionCreate',
	category: 'guild',
	enabled: true,
	once: false,
	run: async (interaction) => {
		const client = interaction.client;

		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);

			if (interaction.user.bot) return;

			if (!command) return await interaction.reply({ content: 'This command is unavailable. *Check back later.*', ephemeral: true }) && client.commands.delete(interaction.commandName);

			try {
				command.run(client, interaction);
			}
			catch (e) {
				await interaction.channel.send({
					content: stripIndents`
					**An error occurred while running this interaction.**
					
					\`\`\`
					${e.message}
					\`\`\`
					`,
					ephemeral: true,
				});
			}
		}
	},
};
