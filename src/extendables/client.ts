import { 
	Client, Partials, GatewayIntentBits, 
	LifetimeSweepOptions, SweepOptions, GuildBan 
} from "discord.js";

function Sweeper() {
	return {
		message: { lifetime: 3000, interval: 10300 } as LifetimeSweepOptions,
		invite: { lifetime: 1000, interval: 10500 } as LifetimeSweepOptions,
		ban: { interval: 8000 } as SweepOptions<string, GuildBan>
	};
}

export class CatalystClient extends Client {
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
				reactions: 
			}
		});
	}

	public login(): void {
		
	}
}