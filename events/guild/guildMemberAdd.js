export default {
	name: 'guildMemberAdd',
	category: 'guild',
	enabled: true,
	once: false,
	run: async (member) => {
		console.log(`👤 ${member.user.username} has joined ${member.guild.name}`);
	},
};