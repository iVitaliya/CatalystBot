import {
    CategoryChannel,
    NewsChannel,
    StageChannel,
    TextChannel,
    AnyThreadChannel,
    VoiceChannel,
    ForumChannel,
    Channel, 
    GuildChannel, 
    Guild } from "discord.js";

import { CatalystClient } from "../index";

export class CatalystChannel {
    private client: CatalystClient;

    public constructor(client: CatalystClient) {
        this.client = client;
    }

    public async get(identifier: string, guild: Guild, supposedToBeType:
        | "category"
        | "news"
        | "stage"
        | "text"
        | "thread"
        | "voice"
        | "forum"): Promise<Channel> {
        const Processor = await guild.channels.cache.find(
            (chan) => chan.name.toLowerCase() === identifier.toLowerCase() ||
                chan.id === identifier.replace(/[\\<>#]/g, '')
        );

        // IF CHANNEL IS NULL OR UNDEFINED, LOG IT

        const chanType = this[supposedToBeType!](Processor!);

        if (typeof chanType === 'string') return chanType;
        else return chanType;
    }

    public category(channel: GuildChannel): CategoryChannel | string | undefined {
        if (channel instanceof CategoryChannel) {
            return channel;
        } else {
            return `The defined channel (\`${channel.name}\`) is not a Category channel!`;
        }
    }

    public news(channel: GuildChannel): NewsChannel | string | undefined {

    }

    public stage(channel: GuildChannel): StageChannel | string | undefined {

    }

    public text(channel: GuildChannel): TextChannel | string | undefined {

    }

    public thread(channel: GuildChannel): AnyThreadChannel | string | undefined {

    }

    public voice(channel: GuildChannel): VoiceChannel | string | undefined {

    }

    public forum(channel: GuildChannel): ForumChannel | string | undefined {
        
    }
}