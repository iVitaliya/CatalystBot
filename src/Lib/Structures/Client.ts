import { 
	Client, Partials, GatewayIntentBits, 
	Collection, LifetimeSweepOptions, 
	SweepOptions, GuildBan, MessageReaction, 
	GuildMember, User, VoiceState, 
	Presence, ThreadMember, StageInstance, 
	GuildEmoji, Sticker, 
} from "discord.js";

import pkg from "../../../package.json";
import {
	CatalystCommand,
	CatalystEmbed,

	CatalystLogger,
	CatalystProcessor,
	CatalystStringFormat,
	CatalystArrayFormat,
	CatalystPermissionFormat,
	CatalystGuildFormat,

	IDatabase,
	Database,

	WarnLog,
	MuteLog,
	KickLog,
	BanLog
} from "../index";

function Sweeper() {
	return {
		message: { lifetime: 3000, interval: 10300 } as LifetimeSweepOptions,
		invite: { lifetime: 1000, interval: 10500 } as LifetimeSweepOptions,
		ban: { interval: 8000, filter: (b: GuildBan, _key: string, _collection: Collection<string, GuildBan>) => !b.user.bot } as unknown as SweepOptions<string, GuildBan>,
		reaction: { interval: 3000 } as SweepOptions<string, MessageReaction>,
		guildMember: { interval: 3500, filter: (m: GuildMember, _key: string, _collection: Collection<string, GuildMember>) => !m.user.bot } as unknown as SweepOptions<string, GuildMember>,
		user: { interval: 5000, filter: (u: User, _key: string, _collection: Collection<string, User>) => !u.bot } as unknown as SweepOptions<string, User>,
		voiceState: { interval: 1500 } as SweepOptions<string, VoiceState>,
		presence: { interval: 1000 } as SweepOptions<string, Presence>,
		threadMember: { interval: 10000 } as SweepOptions<string, ThreadMember>,
		thread: { lifetime: 1000, interval: 1500 } as LifetimeSweepOptions,
		stageInstance: { interval: 1300 } as SweepOptions<string, StageInstance>,
		emoji: { interval: 1200 } as SweepOptions<string, GuildEmoji>,
		sticker: { interval: 950 } as SweepOptions<string, Sticker>
	};
}

enum CatalystDiscordColors {
    BASE = '00ff81',
    WARN = 'f0f725',
    MUTE = '2560f7',
    KICK = 'f79525',
    BAN = 'f73625',
    BUGS = '777d84',
    ERROR = 'f2594b'
}

interface CatalystFormatting {
	string: CatalystStringFormat;
	array: CatalystArrayFormat;
	guild: CatalystGuildFormat;
	permission: CatalystPermissionFormat;
}

interface CatalystFetchers {

}

export class CatalystClient extends Client {
	public prefix: any;
	public swearWords: any;
	public blacklist: any;

	public db: (client: CatalystClient, guildID: string) => IDatabase = Database;

	public colors: typeof CatalystDiscordColors = CatalystDiscordColors;
	public cooldown: Collection<string, number | any> = new Collection<string, number | any>();
	public commands: Collection<string, CatalystCommand>;

	public embed: typeof CatalystEmbed = CatalystEmbed;
	public logger: CatalystLogger = new CatalystLogger();
	public package = pkg;
	public format = {} as CatalystFormatting;
	public fetch = {} as CatalystFetchers;
	public capitalise = (str: string) => str.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');

	public caches = {
        invites: new Collection<string, Collection<string, NodeJS.Timeout>>(),
        warns: new Collection<string, WarnLog>(),
        mutes: new Collection<string, MuteLog>(),
        kicks: new Collection<string, KickLog>(),
        bans: new Collection<string, BanLog>()
    };

	public constructor() {
		super({
			intents: [
				GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution,
				GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents,
				GatewayIntentBits.GuildWebhooks, GatewayIntentBits.MessageContent
			],
			partials: [
				Partials.Channel,
				Partials.GuildMember,
				Partials.Message,
				Partials.Reaction,
				Partials.User
			],
			sweepers: {
				messages: Sweeper().message,
				invites: Sweeper().invite,
				bans: Sweeper().ban,
				reactions: Sweeper().reaction,
				guildMembers: Sweeper().guildMember,
				users: Sweeper().user,
				voiceStates: Sweeper().voiceState,
				presences: Sweeper().presence,
				threadMembers: Sweeper().threadMember,
				threads: Sweeper().thread,
				stageInstances: Sweeper().stageInstance,
				emojis: Sweeper().emoji,
				stickers: Sweeper().sticker
			}
		});

		new CatalystProcessor(this).listerners();
		this.commands = new CatalystProcessor(this).commands();

		this.format.string = new CatalystStringFormat();
		this.format.array = new CatalystArrayFormat();
		this.format.guild = new CatalystGuildFormat();
		this.format.permission = new CatalystPermissionFormat();

		
	}

	public start(): void {
		super.login(process.env.TOKEN);
	}
}