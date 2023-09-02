import { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';

export default {
	data: new ContextMenuCommandBuilder()
		.setName('Avatar')
		.setType(ApplicationCommandType.User)
		.setDMPermission(false),
	contextDescription: 'Fetches the avatar of a user.',
	usage: 'Avatar',
	category: 'Context',
	staffOnly: false,
	run: async (client, interaction) => {
		try {
			const member = interaction.guild.members.cache.get(interaction.targetId) || interaction.client.users.cache.get(interaction.targetId);

			const avatarEmbed = new EmbedBuilder()
				.setTitle(`${member.user.username}'s Avatar`)
				.setColor(client.config.embedColor)
				.setImage(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
				.setFooter({
					text: `ID: ${member.user.id}`,
				});

			return await interaction.reply({ embeds: [avatarEmbed] });
		}
		catch (e) {
			return client.errors.commandError(client, interaction, e, client.fetchCommand(interaction.commandName));
		}
	},
};