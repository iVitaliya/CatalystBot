import { GuildMember } from "discord.js";

import { Info } from "../../index";

export class CatalystPermissionFormat {
    public constructor() { }

    public format(perm: string): string {
        return perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Guild/g, 'Server')
            .replace(/Use Vad/g, 'Use Voice Acitvity');
    }

    public compare(member: GuildMember, target: GuildMember): boolean {
		return member.roles.highest.position < target.roles.highest.position;
	}

    public info(member: GuildMember): Info {
        const obj: Info = {
            highest: {
                mention: `<@&${member.roles.highest}>`,
				id: member.roles.highest.id,
				name: member.roles.highest.name
            },
            roles: member.roles.cache.map((rl) => rl).sort((a: any, b: any) => b - a),
            roleCollection: member.roles.cache
        };

        return obj as Info;
    }
}