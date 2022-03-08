import express from 'express';
import { login } from '../controllers/user-controller.js';
import { promisify, validator } from '../middleware/utils-middleware.js';
import authSchema from '../schemas/auth-schema.js';
import _ from 'lodash';
import Joi from 'joi';
import ApiError from '../utils/errors.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post(
	'/login',
	validator.body(authSchema),
	promisify(async (req, res) => {
		const { username, password } = req.body;
		const authenticatedUser = await login(username, password);

		const authToken = jwt.sign(authenticatedUser, jwtSecret);

		res.status(200).json({
			result: authenticatedUser,
			token: authToken,
			code: 200,
		});
	})
);

router.post(
	'/admin-login',
	validator.body(
		Joi.object({
			token: Joi.string().required(),
		})
	),
	(req, res) => {
		// TODO: should be moved to controller in the next iteration
		const adminToken = process.env.API_ADMIN_TOKEN || null;

		if (!(req.body.token === adminToken)) {
			throw ApiError.unauthorized(
				'invalid login token, please try again'
			);
		}

		const authToken = jwt.sign({ userType: 'ADMIN' }, jwtSecret);

		res.status(200).json({
			result: {
				fullname: 'Admin',
				userType: 'ADMIN',
			},
			token: authToken,
			code: 200,
		});
	}
);

export default router;
