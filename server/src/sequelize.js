import { Sequelize } from '@sequelize/core';
import parentLogger from './utils/logger.js';

const logger = parentLogger.child({ name: 'database' });

const config = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	logging: (msg) => logger.info(msg),
};

const sequelize = new Sequelize(config);
const dbURL = `${config.dialect}://${config.host}:${config.port}/${config.database}`;

try {
	await sequelize.authenticate({ logging: false });
	logger.info(`database connection is open at ${dbURL}`);
} catch (e) {
	logger.fatal(e, `database connection failed at ${dbURL}`);
	throw e;
}

export default sequelize;
