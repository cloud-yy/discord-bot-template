import { Client, Events, GatewayIntentBits, Partials, Collection, ActivityType, PresenceUpdateStatus } from "discord.js"
import express from "express"
import path from "path"

import loadEvents from "#utils/loaders/loadEvents"
import loadCommands from "#utils/loaders/loadCommands"
import loadRoutes from "#utils/loaders/loadRoutes"
import loadInteractions from "#utils/loaders/loadInteractions"

const { Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildPresences } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const web = express()
web.use(express.json())
web.use(express.static(path.join(process.cwd(), 'public')))

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildPresences],
	partials: [User, Message, GuildMember, ThreadMember],
})

client.commands = new Collection()
client.interactions = new Collection()
client.cooldowns = new Collection()

client.setMaxListeners(0)
client.options.presence = { activities: [{ name: "Operational" }], status: PresenceUpdateStatus.Online }

Promise.all([loadRoutes(web), loadEvents(client), loadCommands(client), loadInteractions(client)]).then(() => {
	console.log("Database connecting.")
		console.log("Database connected.")

			console.log("Database synced.")
			console.log("Logging in.")
			client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
				console.log("Logged in.")

				console.log("Webserver starting.")
				web.listen(80)
				console.log("Webserver started.")
			})

})

export { client, web }