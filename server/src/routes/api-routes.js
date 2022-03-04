import express from 'express';
import { login } from '../controller/user-controller.js';
import { promisify, validator } from '../middleware/utils-middleware.js';
import authSchema from '../schemas/auth-schema.js';
import _ from 'lodash';

const router = express.Router();

router.post(
	'/login',
	validator.body(authSchema),
	promisify(async (req, res) => {
		const { username, password } = req.body;
		const authenticatedUser = await login(username, password);

		res.status(200).json({
			result: authenticatedUser,
			code: 200,
		});
	})
);

export default router;
