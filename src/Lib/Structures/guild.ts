import { Client, Guild, GuildBasedChannel } from "discord.js";
import { RawGuildData } from "discord.js/typings/rawDataTypes";

import Database from "../Database/database";
import { CatalystClient } from "./Client";


// @ts-ignore
export class GuildExtended extends Guild {
    constructor(client: Client<true>, data: RawGuildData) {
        super(client, data); 
    }

    public async deleteGuild(): Promise<Guild> {
        return super.delete();
    }

    // @ts-ignore
    public override async delete(catalyst: CatalystClient, key: string): Promise<void> {
        return await Database(catalyst, this.id).core.delete(key);
    }

    public async get<T>(catalyst: CatalystClient, key: string, defaultValue: T): Promise<T> {
        return await Database(catalyst, this.id).core.get<T>(key, defaultValue);
    }

    public async set<T>(catalyst: CatalystClient, key: string, value: T): Promise<void> {
        await Database(catalyst, this.id).core.set<T>(key, value);
    }

    public async prefix(catalyst: CatalystClient): Promise<string> {
        return await this.get<string>(catalyst, `prefix.${this.id}`, "g!");
    }

    public async resolveChannel(query: string) {
        let q: GuildBasedChannel | null;
        
        q = this.channels.cache.find(
            (c) => c.id === query ||
            c.name === query ||
            `<#${c.id}>` === query
        ) || null;

        if (q == null) {
            throw Error("The provided query couldn't be used as a fetchable channel ID, name or mention as it isn't valid to any");
        }

        return q;
    }
}