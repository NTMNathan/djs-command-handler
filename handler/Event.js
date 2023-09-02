import fs from 'fs';

export default async (client) => {
	fs.readdirSync('./events/').forEach(async category => {
		const events = fs.readdirSync(`./events/${category}/`).filter(evt => evt.endsWith('.js'));

		for (const event of events) {
			const eventModule = await import(`../events/${category}/${event}`);
			const e = eventModule.default;

			client.events.set(e.name, e);
			e.once ? client.once(e.name, e.run.bind(event)) : client.on(e.name, e.run);
		}
	});

	console.log('Events have now loaded!');
};