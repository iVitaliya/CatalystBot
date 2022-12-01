import { User, GuildMember } from "discord.js";

export interface Member {
    user: User;
    member: GuildMember;
}