import { ClientEvents } from "discord.js";

import { CatalystClient, ICatalystListener } from "../index";

export class CatalystListener implements ICatalystListener {
    private client: CatalystClient;

    category: string;
    name: keyof ClientEvents;
    description: string;
    once: boolean;

    public constructor(client: CatalystClient, data: ICatalystListener) {
        this.client = client;

        this.category = data.category;
        this.name = data.name;
        this.description = data.description;
        this.once = data.once;
    }

    public async exec(...args: unknown[]): Promise<unknown> {
        throw this.client.logger.error("This operation doesn't do anything!");
    }
}