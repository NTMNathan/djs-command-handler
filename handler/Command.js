import fs from 'fs';

export default async (client) => {
	fs.readdirSync('./commands/').forEach(async category => {
		const commands = fs.readdirSync(`./commands/${category}/`).filter(cmd => cmd.endsWith('.js'));

		for (const command of commands) {
			const cmdModule = await import(`../commands/${category}/${command}`);
			const cmd = cmdModule.default;
			const cmdData = cmd.data.toJSON();

			const cmdSet = {
				name: cmdData.name,
				type: cmdData.type,
				description: cmdData.description,
				options: cmdData.options,
				usage: cmdData.usage,
				contextDescription: cmd.contextDescription,
				category: cmd.category,
				staffOnly: cmd.staffOnly,
				run: cmd.run,
			};

			client.commands.set(cmdSet.name, cmdSet);
		}
	});

	console.log('Slash Commands and Context Menus have now loaded!');
};