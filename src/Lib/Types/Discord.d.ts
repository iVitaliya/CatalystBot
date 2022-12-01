import {
    Message,
    MessageEmbed,
    MessageCreateOptions as MessageOptions,
    User,
    GuildMember as Member,
    TextChannel,
    Guild
} from "discord.js";

import { CatalystClient } from "../index";

export interface ICatalystMessage extends Message {
    embeddable: boolean;

    dm(
        content: string,
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message | void>;

    send(
        content: string,
        state: "success" | "failure" | "other",
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message | void>;
}

export interface ICatalystGuildMessage extends ICatalystMessage {
    author: User;
    member: Member;
    channel: TextChannel;
    guild: CatalystGuild
}

export interface ICatalystGuild extends Guild {
    client: CatalystClient;
    database: {
        delete(catalyst: CatalystClient, key: string): Promise<void>;
        get<T>(catalyst: CatalystClient, key: string, defaultValue: T): Promise<T>;
        set<T>(catalyst: CatalystClient, key: string, value: T): Promise<void>;
        prefix(catalyst: CatalystClient): Promise<string>;

    };
}

export interface ICatalystDeleteMessageOptions {
    delete: number;
    reason?: string;
}