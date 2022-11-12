import {
	gray as grayBright, greenBright,
	blackBright as gray, dim, red,
	redBright, yellow, whiteBright,
	blueBright, yellowBright
} from "colorette";
import moment from "moment";


enum LogLevel {
	INFO = 1,
	DEBUG = 3,
	WARNING = 5,
	ERROR = 10,
	FATAL = 20
}

interface ILogger {
	info: (message: string) => void;
	debug: (message: string) => void;
	warning: (message: string) => void;
	error: (message: string) => void;
	fatal: (message: string) => void;
	log: (state: LogLevel, message: string) => void;
}

function Colorize(state: LogLevel, message: string): string {
	const func = (_state: string) => {
		const time = `${gray("[")}${yellow(moment(Date.now()).format("MMMM [the] Do YYYY [@] h:mm:ss.sss"))}${gray("]")}`;

		`${time} ${gray("(")}${_state}${gray(")")}${grayBright(":")}`;
	};

	let str: string = `${func(blueBright("Info"))} ${whiteBright(message)}`;
	switch (state) {
		case LogLevel.INFO:
			str = `${func(blueBright("Info"))} ${whiteBright(message)}`;
			break;
		case LogLevel.DEBUG:
			str = `${func(dim(greenBright("Debug")))} ${whiteBright(message)}`;
			break;
		case LogLevel.WARNING:
			str = `${func(dim(yellowBright("Warning")))} ${whiteBright(message)}`;
			break;
		case LogLevel.FATAL:
			str = `${func(red("Fatal")} ${whiteBright(message)}`;
			break;
		case LogLevel.ERROR:
			str = `${func(redBright("Error"))} ${whiteBright(message)}`;
			break;
	}

	return str;
}

function P(msg: string): void {
	if (process.stdout.writable) {
		process.stdout.write(msg);
	}

	console.log(msg);
}

const Logger = {
	info: (message: string): void => {
		P(Colorize(LogLevel.INFO, message));

		return;
	},
	debug: (message: string): void => {
		P(Colorize(LogLevel.DEBUG, message));

		return;
	},
	warning: (message: string): void => {
		P(Colorize(LogLevel.WARNING, message));

		return;
	},
	error: (message: string): void => {
		P(Colorize(LogLevel.ERROR, message));

		return;
	},
	fatal: (message: string) => {
		await P(Colorize(LogLevel.FATAL, message));
		
		process.exit(1);
	},
	log: (state: LogLevel, message: string): void => {
		if (state === LogLevel.FATAL) {
			await P(Colorize(LogLevel.FATAL, message));

			process.exit(1);
		}

		P(Colorize(state, message));
		return;
	},
} as ILogger;

export default {
	Logger,
	LogLevel,
};