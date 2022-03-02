import pino from 'pino';
import path from 'path';

const transport = pino.transport({
	target: 'pino-pretty',
	options: {
		translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
		destination: 'app.log',
		ignore: 'pid,hostname',
		colorize: false,
	},
});

const logger = pino(transport);

export const getLoggerInstance = (identifier, convertURL = true) => {
	if (convertURL) {
		identifier = path.basename(new URL(identifier).pathname);
	}
	return logger.child({ name: identifier });
};

export default logger;
