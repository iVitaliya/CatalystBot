import { ClientEvents, PermissionResolvable } from "discord.js";

import { CatalystClient } from "../index";

export interface ICatalystListener {
    category: string;
    name: keyof ClientEvents;
    description: string;
    once: boolean;
}

export interface ICatalystCommand {
    category: string;
    name: string;
    aliases: string[];
    usages: string | string[];
    examples: string | string[];

    description: string;

    permissions: {
        server: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
        channel: {
            client: PermissionResolvable[];
            user: PermissionResolvable[];
        };
    };

    settings: {
        nsfw: boolean;
        channel: "DM" | "GUILD";
        owner: boolean;
        developer: boolean;

        cooldown: {
            duration: number;
            limit: number;
        };
    };
}