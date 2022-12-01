import { Guild, GuildMember, Role } from "discord.js"

export class CatalystGuildFormat {
    public constructor() { }

    public roles(guild: Guild): string {
        return guild.roles.cache.sort((a: Role, b: Role) => b.position - a.position).map((rl) => rl.name).join(", ");
    }

    public async members(guild: Guild): Promise<string> {
        const memberList = await guild.members.list({ cache: true });
        let res: string = "";

        memberList.sort((a: GuildMember, b: GuildMember) => b.joinedAt!.getDate() - a.joinedAt!.getDate()).forEach((x) => res = res + `${x.user.tag} (${x.id})\n`);

        return res;
    }
}