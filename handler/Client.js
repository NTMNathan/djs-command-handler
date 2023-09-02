import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

import Util from '../util/Util.js';
import Config from '../config.js';

export default class extends Client {
	constructor(...opt) {
		super({
			opt,
			allowedMentions: {
				parse: [
					'users',
					'roles',
				],
				repliedUser: true,
			},
			partials: [
				Partials.GuildMember,
				Partials.Message,
				Partials.Channel,
				Partials.User,
				Partials.Reaction,
			],
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageReactions,
			],
		});

		this.config = Config;
		this.util = new Util(this);

		this.commands = new Collection();
		this.events = new Collection();
	}

	async login() {
		await super.login(process.env.TOKEN);
	}
}