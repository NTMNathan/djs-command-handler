import { ActivityType } from 'discord.js';

export default {
	name: 'ready',
	category: 'client',
	enabled: true,
	once: true,
	run: async (client) => {
		client.user.setActivity('👋 Hello World!', { type: ActivityType.Playing });

		console.log(`Discord Bot is now online with ${client.users.cache.size} users and ${client.guilds.cache.size} servers.`);
	},
};