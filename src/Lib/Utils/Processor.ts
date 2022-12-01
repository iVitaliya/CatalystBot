import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { resolve, join } from "path";

import { CatalystClient, CatalystCommand } from "../index";

export class CatalystProcessor {
    private client: CatalystClient;

    public constructor(client: CatalystClient) {
        this.client = client;
    }

    public listerners(): void {
        const folder = readdirSync(resolve(join(__dirname, '..', '..', 'Listeners')));

        for (const sub_folder of folder) {
            const files: string[] = readdirSync(resolve(join(__dirname, '..', '..', 'Listeners', sub_folder))).filter((f: string) => f.endsWith('.js'));

            for (const file of files) {
                try {
                    let evt = require(`../../Listeners/${sub_folder}/${file}`);
                    evt = new evt(this);

                    this.client[evt.once ? 'once' : 'on'](evt.name, (...args) => evt.exec(args));
                } catch (err) {
                    this.client.logger.error(`Event "${file}" couldn't run: ${err}`);
                }
            }
        }
    }

    public commands(): Collection<string, CatalystCommand> {
        const map: Collection<string, CatalystCommand> = new Collection();
        console.log('\n');

        const folder = readdirSync(resolve(join(__dirname, '..', '..', 'Commands')));

        for (const sub_folder of folder) {
            this.client.logger.info(`${sub_folder}:`);

            const files: string[] = readdirSync(resolve(join(__dirname, '..', '..', 'Commands', sub_folder))).filter((f: string) => f.endsWith('.js'));

            for (const file of files) {
                try {
                    let cmd = require(`../../Commands/${sub_folder}/${file}`);
                    cmd = new cmd(this);

                    map.set(cmd.name, cmd);

                    this.client.logger.info(`-- ✅ ${file}`)
                } catch (err) {
                    this.client.logger.error(`-- ❌ ${file}`);
                }
            }
            console.log('\n');
        }

        return map;
    }
}