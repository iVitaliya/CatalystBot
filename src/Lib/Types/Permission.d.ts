import { Collection, Role } from 'discord.js';

export interface Info {
    highest: {
        mention: string;
        id: string;
        name: string;
    };
    roles: Role[];
    roleCollection: Collection<string, Role>
}