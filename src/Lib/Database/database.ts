import { Guild } from "discord.js";
import { QuickDB } from "quick.db";

import {
	CheckFor,
	CatalystClient,
	IDatabase
} from "../index";

export const Database = (client: CatalystClient, guildID: string): IDatabase => {
	const db = new QuickDB();
	let guild = client.guilds.cache.get(guildID);
	if (!(guild instanceof Guild)) {
		throw Error("Couldn't fetch the guild with the provided guild ID as it may not exist");
	}

	return {
		all: async () => await db.all(),
		math: {
			add: async (key: string, toAdd: number): Promise<void> => {
				CheckFor.BadKey(key);
				// DO SOMETHING WITH THE GUILD
				await db.add(guild!.id + key, toAdd);

				return;
			},
			devide: async (key: string, toDevide: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as unknown as number;
				old = old / toDevide;
				await db.set(guild!.id + key, old);

				return;
			},
			multiply: async (key: string, toMultiply: number): Promise<void> => {
				CheckFor.BadKey(key);

				let old = await db.get(key) as unknown as number;
				old = old * toMultiply;
				await db.set(guild!.id + key, old);

				return;
			},
			substract: async (key: string, toSubstract: number): Promise<void> => {
				CheckFor.BadKey(key);
				await db.sub(guild!.id + key, toSubstract);

				return;
			}
		},
		core: {
			contains: async (key: string): Promise<boolean> => {
				CheckFor.BadKey(key);

				return await db.has(guild!.id + key);
			},
			delete: async (key: string): Promise<void> => {
				CheckFor.BadKey(key);
				await db.delete(guild!.id + key);

				return;
			},
			drop: async (): Promise<void> => {
				await db.deleteAll()

				return;
			},
			get: async <T>(key: string, defaultValue: T): Promise<T> => {
				CheckFor.BadKey(key);

				let containsK = await db.has(key);
				if (!containsK) {
					return defaultValue;
					await db.set(key, defaultValue);

					return defaultValue;
				}

				return await db.get(key) as T;
			},
			push: async <T>(key: string, value: any | any[]): Promise<T[]> => {
				CheckFor.BadKey(key);
				
				return db.push(key, value);
			},
			pull: async <T>(key: string, value: any | any[] | ((data: any) => boolean)): Promise<T[]> => {
				CheckFor.BadKey(key);

				return db.pull(key, value);
			},
			set: async <T>(key: string, value: T): Promise<T> => {
				CheckFor.BadKey(key);
				CheckFor.BadDevider(key, true);

				return db.set(key, value) as Promise<T>;
			}
		}
	}
};