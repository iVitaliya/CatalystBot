import { Message, Embed, User, Guild, TextChannel } from "discord.js";

import { CatalystClient, ICatalystDeleteMessageOptions } from "../index";

export class CatalystEmbed {
    private client: CatalystClient;
    private message: Message

    public constructor(client: CatalystClient, message: Message) {
        this.client = client;
        this.message = message;
    }

    /** @param channel_identifier This can be the name, id or mention of the channel. */
    public async send(type: 'Embed' | 'Raw', channel_identifier: string, guild: Guild, content: string, delete_options?: ICatalystDeleteMessageOptions) {}
}