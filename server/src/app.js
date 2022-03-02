import dotenv from 'dotenv/config';
import express from 'express';
import pino from 'express-pino-logger';

import parentLogger from './utils/logger.js';
import sequelize from './sequelize.js';
import path from 'path';

const logger = parentLogger.child({
	name: path.basename(new URL(import.meta.url).pathname),
});

const app = express();
const sv_host = process.env.SV_HOST || 'localhost';
const sv_port = process.env.SV_PORT || 8080;
const api_prefix = process.env.API_PREFIX || 'api';

app.use(pino({ logger }));
app.use(api_prefix, express.json());
app.use(api_prefix, express.urlencoded({ extended: true }));

app.use();

app.listen(sv_port, sv_host, () => {
	logger.info(`server is listening on http://${sv_host}:${sv_port}`);
});
