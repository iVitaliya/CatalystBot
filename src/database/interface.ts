import { Guild } from "discord.js";
import { CatalystClient } from "../extendables/client";

interface IDBItem {

}

const DBItem = (client: CatalystClient, guildID: string): IDBItem => {
	let guild = client.guilds.cache.get(guildID);
	if (!(guild instanceof Guild)) {
		throw Error("")
	}
};

export default DBItem;