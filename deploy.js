import { REST, Routes } from 'discord.js';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const deploy = async () => {
	const commandData = [];

	try {
		const categories = await fs.readdir('./commands/');
		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
		const clientId = process.env.CLIENT_ID;

		for (const category of categories) {
			const commands = await fs.readdir(`./commands/${category}/`);

			for (const command of commands) {
				if (command.endsWith('.js')) {
					const cmdModule = await import(`./commands/${category}/${command}`);
					const cmd = cmdModule.default;

					const cmdData = cmd.data.toJSON();
					commandData.push(cmdData);
				}
			}
		}

		console.log('» Started refreshing Slash Commands and Context Menus...');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandData },
		);

		console.log('» Slash Commands and Context Menus have now been deployed.\n These may take up to an hour to fan out to all servers and users.');
	}
	catch (e) {
		console.error(e);
	}
};

deploy();