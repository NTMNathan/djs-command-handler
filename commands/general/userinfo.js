import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { stripIndents } from 'common-tags';

export default {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Returns information about a user.')
		.setDMPermission(false)
		.addUserOption((user) =>
			user
				.setName('user')
				.setDescription('The user to view.')
				.setRequired(false),
		),
	contextDescription: null,
	usage: 'userinfo [user]',
	category: 'General',
	staffOnly: false,
	run: async (client, interaction) => {
		try {
			const member = interaction.options.getMember('user') || interaction.member;

			const embed = new EmbedBuilder()
				.setTitle(`**${member.user.username}${member.user.discriminator && member.user.discriminator !== '0' ? `#${member.user.discriminator}` : ''}**`)
				.setColor(client.config.embedColor)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
				.addFields(
					{
						name: '👤 Account Info',
						value: stripIndents`
                        **ID:** ${member.user.id}
                        **Bot:** ${member.user.bot ? 'Yes' : 'No'}
                        **Created:** <t:${Math.floor(member.user.createdTimestamp / 1000)}:d>
                        `,
						inline: true,
					},
					{
						name: '📋 Member Info',
						value: stripIndents`
                        **Joined Server:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>
                        **Nickname:** ${member.nickname || 'None'}
                        **Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}
                        `,
						inline: true,
					},
					{
						name: `📝 Roles [${member.roles.cache.size - 1}]`,
						value: member.roles.cache.size - 1 ? member.roles.cache.map(roles => `**${roles}**`).slice(0, -1).join(' ') : 'None',
						inline: false,
					},
				);

			await interaction.reply({ embeds: [embed] });
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